'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePicker } from '@/components/DatePicker'
import { getDepartments } from './departments'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { SpinnerCustom } from '@/components/SpinnerCustom'

export type AdminDoctor = {
  id: string
  firstName: string
  middleName?: string | null
  lastName: string
  imageUrl: string
  email: string
  phone: string
  gender: string
  city: string
  state: string
  department?: {
    name: string
  } | null
  createdAt: string
}

export type AdminDoctorProps = {
  doctors: AdminDoctor[]
  departments: string[]
  kindeUser: any
}

export default function AdminDoctorsContent({ doctors, departments, kindeUser }: AdminDoctorProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [docId, setDocId] = useState<string>("")

  // STATE FOR FORM INPUTS
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    state: '',
    city: '',
    address1: '',
    address2: '',
    department: '',
    password: '',
    imageFile: null as File | null
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target
    const name = target.name

    // Check if it's an input file
    if (target instanceof HTMLInputElement && target.type === 'file') {
        const file = target.files?.[0] || null
        setFormData({ ...formData, [name]: file })
        if (file) setPreview(URL.createObjectURL(file))
    } else {
        setFormData({ ...formData, [name]: target.value })
    }
  }


  // HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    console.log({
      ...formData,
      imageFile: preview ? formData.imageFile : null
    })
    try {
        const fd = new FormData()

        fd.append("firstName", formData.firstName)
        fd.append("middleName", formData.middleName)
        fd.append("lastName", formData.lastName)
        fd.append("email", formData.email)
        fd.append("phone", formData.phone)
        fd.append("gender", formData.gender)
        fd.append("dob", formData.dob)
        fd.append("state", formData.state)
        fd.append("city", formData.city)
        fd.append("address1", formData.address1)
        fd.append("address2", formData.address2)
        fd.append("department", formData.department)

        if (!formData.imageFile) {
        toast.error("Doctor image is required")
        setSubmitting(false)
        return
        }

        fd.append("image", formData.imageFile)

        const getRes = await fetch(`/api/admin/dashboard/${kindeUser.id}/addDoctor`, {
            method: 'POST',
            body: fd
        })
        const res = await getRes.json()
        if(res.success){
            setSubmitting(false)
            setSubmitted(true)
            setOpenDialog(false)
            toast.info("Doctor added successfully")
        }
        else{
            setSubmitting(false)
            toast.error("Error occurred in submitting!")
            console.error(res.error)
            setSubmitted(false)
        }
    } catch (error: any) {
        console.log("Frontend error: ", error.message)
        setSubmitted(false)
    }
  }

  // deleting a doctor
  const handleDelDoctor = async () => {
    try {
      const getRes = await fetch(`/api/doctor/dashboard/${kindeUser.id}/delDoctor`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: docId})
      })
      const res = await getRes.json()
      if(res.success) toast.success("Doctor deleted successfully")
      else{
        console.error(res.error)
        toast.error("Oops! Something went wrong")
      }
    
    } catch (error: any) {
      console.error("Frontend Error: ", error.message)
      toast.error("Something went wrong! please try again later")
    }
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between px-10 max-md:px-6">
        <h1 className="text-2xl font-bold">Doctors</h1>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <button onClick={() => setOpenDialog(true)} className="group px-4 py-2 hover:opacity-90 flex gap-2 items-center justify-center p-1 border-2 rounded-xl cursor-pointer text-xs">
              <span className='flex items-center justify-center gap-2 group-hover:bg-emerald-500 rounded-md group-hover:px-1 transition-all duration-500 ease-in-out'>
                <span className='px-3 py-1.5 max-md:px-2 max-md:py-px bg-emerald-500 rounded-md flex items-center justify-center text-lg'>+</span> Add doctor
              </span>
            </button>
          </DialogTrigger>

          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-scroll">
            <DialogHeader>
              <DialogTitle>Add Doctor</DialogTitle>
            </DialogHeader>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="space-y-1">
                <Label className='mb-2'>First Name</Label>
                <Input name="firstName" className='py-5.5 mt-1' placeholder="John" value={formData.firstName} onChange={handleChange} required />
              </div>

              {/* Middle Name */}
              <div className="space-y-1">
                <Label className='mb-2'>Middle Name</Label>
                <Input name="middleName" className='py-5.5 mt-1' placeholder="Optional" value={formData.middleName} onChange={handleChange} required />
              </div>

              {/* Last Name */}
              <div className="space-y-1">
                <Label className='mb-2'>Last Name</Label>
                <Input name="lastName" className='py-5.5 mt-1' placeholder="Doe" value={formData.lastName} onChange={handleChange} required />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <Label className='mb-2'>Email</Label>
                <Input name="email" className='py-5.5 mt-1' type="email" placeholder="doctor@email.com" value={formData.email} onChange={handleChange} required />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <Label className='mb-2'>Phone</Label>
                <Input name="phone" className='py-5.5 mt-1' placeholder="+91 9876543210" value={formData.phone} onChange={handleChange} required />
              </div>

              {/* Gender */}
              <div className="space-y-1">
                <Label className='mb-2'>Gender</Label>
                <Select name="gender" value={formData.gender} onValueChange={value => setFormData({ ...formData, gender: value })} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date of Birth */}
              <div className="space-y-1">
                <Label className='mb-2'>Date of Birth</Label>
                <DatePicker className='py-6 mt-1' value={formData.dob} onChange={value => setFormData({ ...formData, dob: value })} />
              </div>

              {/* State */}
              <div className="space-y-1">
                <Label className='mb-2'>State</Label>
                <Input name="state" className='py-5.5 mt-1' placeholder="State" value={formData.state} onChange={handleChange} required />
              </div>

              {/* City */}
              <div className="space-y-1">
                <Label className='mb-2'>City</Label>
                <Input name="city" className='py-5.5 mt-1' placeholder="City" value={formData.city} onChange={handleChange} required />
              </div>

              {/* Address Line 1 */}
              <div className="space-y-1">
                <Label className='mb-2'>Address Line 1</Label>
                <Input name="address1" className='py-5.5 mt-1' placeholder="Street address" value={formData.address1} onChange={handleChange} required />
              </div>

              {/* Address Line 2 */}
              <div className="space-y-1">
                <Label className='mb-2'>Address Line 2</Label>
                <Input name="address2" className='py-5.5 mt-1' placeholder="Apartment, suite, etc." value={formData.address2} onChange={handleChange} required />
              </div>

              {/* Department */}
              <div className="space-y-1">
                <Label className='mb-2'>Department</Label>
                <Select name="department" value={formData.department} onValueChange={value => setFormData({ ...formData, department: value })} >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                   {
                        departments.length > 0 ? (
                            departments.map((department) => (
                            <SelectItem value={department} key={department}>
                                {department}
                            </SelectItem>
                            ))
                        ) : (
                            Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} />
                            ))
                        )
                    }

                    {/* <SelectItem value={dept.id}>{dept.name}</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className='mb-4'>Doctor Image</Label>
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-emerald-500 transition">
                  <span className="text-sm font-medium text-gray-600">
                    Click to upload doctor photo
                  </span>
                  <span className="text-xs text-gray-400">
                    PNG, JPG (recommended)
                  </span>
                  <Input
                    name="imageFile"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>

                {preview && (
                  <div className="relative mt-3 w-fit">
                    <img src={preview} alt="Preview" className="h-20 w-20 rounded-md object-cover border" />
                    <button type="button" onClick={() => { setPreview(null); setFormData({ ...formData, imageFile: null }) }} className="absolute -right-2 -top-2 rounded-full bg-black p-1 text-white hover:bg-red-600 cursor-pointer">
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-4">
                <DialogClose asChild>
                  <Button variant="destructive" className="cursor-pointer w-1/3 max-md:w-2/5 py-5.5 hover:opacity-80">Close</Button>
                </DialogClose>
                <Button disabled={submitting} type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer w-1/3 py-5.5 max-md:w-2/5">{submitting ? <SpinnerCustom /> : 'Save Doctor'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Doctors Grid */}
      {
        !doctors || doctors.length === 0 ? (
             <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 px-10">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                    key={i}
                    className="border rounded-xl shadow-sm overflow-hidden animate-pulse flex flex-col gap-3 p-4"
                    >
                    {/* Image placeholder */}
                    <div className="relative h-55 w-full max-md:h-40 overflow-hidden rounded-xl bg-gray-500">
                        <Skeleton className="h-full w-full" />
                    </div>

                    {/* Text placeholders */}
                    <div className="p-4 flex flex-col gap-2">
                        <Skeleton className="h-6 w-3/4 rounded" /> {/* Name */}
                        <Skeleton className="h-4 w-1/2 rounded" /> {/* Department */}
                        <Skeleton className="h-4 w-1/3 rounded" /> {/* Optional extra info */}
                    </div>

                    {/* Buttons placeholders */}
                    <div className="flex gap-2 p-4">
                        <Skeleton className="h-10 flex-1 rounded" /> {/* Edit */}
                        <Skeleton className="h-10 flex-1 rounded" /> {/* Delete */}
                    </div>
                    </div>
                ))}
                </div>
        ) : 
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 px-10">
            {doctors.map((doctor) => (
                <Dialog key={doctor.email}>
                <DialogTrigger asChild className='p-2 border-2 rounded-xl'>
                    <button className="group flex flex-col items-center gap-3 text-left">
                    <div className="relative h-55 w-70 max-md:h-40 max-md:w-60 overflow-hidden rounded-xl">
                        <Image
                        src={doctor.imageUrl}
                        alt="Doctor Image"
                        fill
                        className="object-cover transition group-hover:scale-105 cursor-pointer duration-500"
                        />
                    </div>

                    <div className="text-center">
                        <h2 className="font-semibold">
                        Dr. {doctor.firstName} {doctor.lastName}
                        </h2>
                        <p className="text-xs text-gray-500">
                        {doctor.department?.name ?? 'No Department'}
                        </p>
                    </div>
                    </button>
                </DialogTrigger>

                {/* Popup Dialog */}
                <DialogContent className="max-w-lg py-10">
                    <DialogHeader>
                    <DialogTitle>
                        Dr. {doctor.firstName} {doctor.middleName ?? ''} {doctor.lastName}
                    </DialogTitle>
                    </DialogHeader>

                    <div className="flex gap-4">
                    <div className="relative h-28 w-28 overflow-hidden rounded-lg">
                        <Image
                        src={doctor.imageUrl}
                        alt="Doctor Image"
                        fill
                        className="object-cover"
                        />
                    </div>

                    <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Department:</span> {doctor.department?.name ?? '—'}</p>
                        <p><span className="font-medium">Email:</span> {doctor.email}</p>
                        <p><span className="font-medium">Phone:</span> {doctor.phone}</p>
                        <p><span className="font-medium">Gender:</span> {doctor.gender}</p>
                        <p><span className="font-medium">Location:</span> {doctor.city}, {doctor.state}</p>
                        <p className="text-xs text-gray-400">
                        Joined on {new Date(doctor.createdAt).toDateString()}
                        </p>
                    </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1 cursor-pointer hover:opacity-80">Edit</Button>
                    <Button variant="destructive" className="flex-1 cursor-pointer hover:opacity-80" onClick={
                      async () => {
                        try {
                          const getRes = await fetch(`/api/doctor/dashboard/${kindeUser.id}/delDoctor`,{
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({id: doctor.id})
                          })
                          const res = await getRes.json()
                          if(res.success) toast.success("Doctor deleted successfully")
                          else{
                            console.error(res.error)
                            toast.error("Oops! Something went wrong")
                          }
                        
                        } catch (error: any) {
                          console.error("Frontend Error: ", error.message)
                          toast.error("Something went wrong! please try again later")
                        }

                      }}>Delete</Button>
                    </div>
                </DialogContent>
                </Dialog>
            ))}
        </div>
      }

    </div>
  )
}
