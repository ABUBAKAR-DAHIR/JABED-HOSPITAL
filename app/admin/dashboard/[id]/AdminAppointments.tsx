'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

export type Doctor = {
  name: string
  docId: string
}

export type AdminAppointmentType = {
  id: string
  fullName: string
  phoneNumber: string
  time: string
  reason: string
  resolved: boolean
  assignedDoctor?: string | null
  doctors: Doctor[]
  createdAt: string
}

export default function AdminAppointments({ appointments }: { appointments?: AdminAppointmentType[] }) {
  const hasAppointments = appointments && appointments.length > 0
  const [openAssignDialog, setOpenAssignDialog] = useState(false)

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold bg-clip-text bg-linear-to-r text-transparent from-emerald-300 to-emerald-950">Appointments</h1>
      <p className="">All upcoming and past appointments</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hasAppointments
          ? appointments!.map((appointment) => (<>
              <Dialog key={appointment.id}>
                <DialogTrigger asChild>
                  <div className="cursor-pointer rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition p-4 animate-none">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">{appointment.fullName}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-500">{appointment.phoneNumber}</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${appointment.resolved ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {appointment.resolved ? 'Resolved' : 'Pending'}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{new Date(appointment.time).toLocaleString()}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{appointment.reason}</p>
                  </div>
                </DialogTrigger>

                <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                  <DialogHeader className="flex justify-between items-center">
                    <DialogTitle>{appointment.fullName}</DialogTitle>
                    <DialogClose asChild>
                      <Button variant="ghost" className="p-1 rounded-full hover:bg-gray-200">
                        <X size={20} />
                      </Button>
                    </DialogClose>
                  </DialogHeader>

                  <div className="space-y-3 mt-4 text-sm text-gray-700 dark:text-gray-200">
                    <p><span className="font-medium">Phone:</span> {appointment.phoneNumber}</p>
                    <p><span className="font-medium">Appointment Time:</span> {new Date(appointment.time).toLocaleString()}</p>
                    <p><span className="font-medium">Reason:</span> {appointment.reason}</p>
                    {appointment.assignedDoctor && <p><span className="font-medium">Assigned Doctor:</span> {appointment.assignedDoctor}</p>}
                    <p className="text-xs text-gray-400">Created on {new Date(appointment.createdAt).toDateString()}</p>
                  </div>
                  <div className="flex justify-between px-10">
                    <Button variant="destructive" className='px-10 max-md:px-8 cursor-pointer'>Reject</Button>
                    
                    {/* Assigning a doctor to the appointment */}
                    <Button onClick={() => setOpenAssignDialog(true)} variant="default" className='px-10 max-md:px-8 cursor-pointer'>Assign</Button>
                  </div>
                </DialogContent>
              </Dialog>

                {/* Second Dialog for assigning doctor */}
              <Dialog open={openAssignDialog} onOpenChange={setOpenAssignDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className='text-center my-4 max-md:my-2'>Assign a Doctor</DialogTitle>
                  </DialogHeader>

                  {/* your doctor selection UI here */}
                  <div className='overflow-y-scroll'>
                    {
                      appointment.doctors.map(doc => (
                        <Button key={doc.docId} variant="outline" className='w-full cursor-pointer mb-2' onClick={async () => {
                          try {
                            console.log("Doctor: ", doc)
                              const res = await fetch('/api/admin/assignDoctor', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ doctor: doc.docId, appointmentId: appointment.id }),
                              })
    
                              const data = await res.json()
                              if (data.success) {
                                setOpenAssignDialog(false);
                                toast.success("Doctor assigned successfully")
                              }
                              else{
                                toast.error("Something went wrong")
                                console.error(data.error)
                              }
                          } catch (error: any) {
                            console.error("Frotend error: ", error.message)
                            toast.error("Something went wrong. please try again later")
                          }
                        }                   
                        }>{doc.name}</Button>
                      ))
                    }
                  </div>
                </DialogContent>
              </Dialog>
            </>
            ))
          : Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl border border-gray-200 shadow-sm overflow-hidden p-4">
                <Skeleton className="h-6 w-3/4 mb-2 rounded" />
                <Skeleton className="h-4 w-1/2 mb-1 rounded" />
                <Skeleton className="h-4 w-2/3 mb-1 rounded" />
                <Skeleton className="h-4 w-full rounded" />
              </div>
            ))}
      </div>

      
    </div>
  )
}
