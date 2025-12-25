'use client'

import React from 'react'
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

export type AdminPatientType = {
  id: string
  firstName: string
  middleName?: string | null
  lastName: string
  phone: string
  gender: string
  dob: string
  state: string
  city: string
  address1: string
  address2?: string
  allergies?: string
  medications?: string
  surgeries?: string
  chronicConditions?: string
  notes?: string
  createdAt: string
}

export default function AdminPatientsInfo({ patients }: { patients?: AdminPatientType[] }) {
  const getInitials = (firstName: string, middleName?: string | null, lastName?: string) => {
    return `${firstName[0]}${middleName ? middleName[0] : ''}${lastName ? lastName[0] : ''}`.toUpperCase()
  }

  const hasPatients = patients && patients.length > 0

  return (
    <div className="space-y-8 p-6">
      {/* Glassy Gradient Title */}
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600">
        Patients
      </h1>
      <p className="text-gray-500 dark:text-gray-400">All registered patients in your hospital</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hasPatients
          ? patients!.map((patient) => (
              <Dialog key={patient.id}>
                <DialogTrigger asChild>
                  <div className="cursor-pointer rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition overflow-hidden">
                    <div className="h-40 w-full flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xl font-bold">
                        {getInitials(patient.firstName, patient.middleName, patient.lastName)}
                      </div>
                    </div>
                    <div className="p-4 space-y-1">
                      <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600">
                        {patient.firstName} {patient.middleName ?? ''} {patient.lastName}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{patient.city}, {patient.state}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{patient.phone}</p>
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                  <DialogHeader className="flex justify-between items-center">
                    <DialogTitle className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600">
                      {patient.firstName} {patient.middleName ?? ''} {patient.lastName}
                    </DialogTitle>
                    <DialogClose asChild>
                      <Button variant="ghost" className="p-1 rounded-full hover:bg-gray-200">
                        <X size={20} />
                      </Button>
                    </DialogClose>
                  </DialogHeader>

                  <div className="space-y-3 mt-4 text-sm text-gray-700 dark:text-gray-300">
                    <p><span className="font-medium text-emerald-500">Phone:</span> {patient.phone}</p>
                    <p><span className="font-medium text-emerald-500">Gender:</span> {patient.gender}</p>
                    <p><span className="font-medium text-emerald-500">Date of Birth:</span> {new Date(patient.dob).toDateString()}</p>
                    <p><span className="font-medium text-emerald-500">Address:</span> {patient.address1} {patient.address2 ?? ''}</p>
                    {patient.allergies && <p><span className="font-medium text-emerald-500">Allergies:</span> {patient.allergies}</p>}
                    {patient.medications && <p><span className="font-medium text-emerald-500">Medications:</span> {patient.medications}</p>}
                    {patient.surgeries && <p><span className="font-medium text-emerald-500">Surgeries:</span> {patient.surgeries}</p>}
                    {patient.chronicConditions && <p><span className="font-medium text-emerald-500">Chronic Conditions:</span> {patient.chronicConditions}</p>}
                    {patient.notes && <p><span className="font-medium text-emerald-500">Notes:</span> {patient.notes}</p>}
                    <p className="text-xs text-gray-400">Joined on {new Date(patient.createdAt).toDateString()}</p>
                  </div>
                </DialogContent>
              </Dialog>
            ))
          : Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
      </div>

      {!hasPatients && (
        <div className="mt-6 rounded-lg border border-dashed p-12 text-center text-gray-400">
          No patients found.
        </div>
      )}
    </div>
  )
}
