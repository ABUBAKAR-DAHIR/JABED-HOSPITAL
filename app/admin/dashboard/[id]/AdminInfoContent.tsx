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

export type AdminInfoType = {
  firstName: string
  middleName?: string | null
  lastName: string
  email: string
  phone: string
  gender: string
  dob: string
  state: string
  city: string
  address1: string
  address2?: string
  lastLogin?: string
  createdAt: string
}

export default function AdminInfoContent({ admin }: { admin?: AdminInfoType }) {
  if (!admin) {
    return (
      <div className="p-6 space-y-6">
      {/* Card trigger skeleton */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition p-6 animate-pulse">
            <Skeleton className="h-8 w-1/2 mb-2 rounded" /> {/* Name */}
            <Skeleton className="h-4 w-1/3 mb-1 rounded" /> {/* Email */}
            <Skeleton className="h-4 w-2/3 mb-2 rounded" /> {/* Phone */}
            <Skeleton className="h-8 w-1/2 mb-2 rounded" /> {/* Name */}
            <Skeleton className="h-4 w-1/3 mb-1 rounded" /> {/* Email */}
            <Skeleton className="h-4 w-2/3 rounded" /> {/* Phone */}
          </div>
        </DialogTrigger>

        {/* Dialog content skeleton */}
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex justify-between items-center">
            <DialogTitle>
              <Skeleton className="h-8 w-3/4 rounded" /> {/* Title */}
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" className="p-1 rounded-full hover:bg-gray-200">
                <X size={20} />
              </Button>
            </DialogClose>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            <Skeleton className="h-4 w-full rounded" /> {/* Email */}
            <Skeleton className="h-4 w-5/6 rounded" /> {/* Phone */}
            <Skeleton className="h-4 w-3/4 rounded" /> {/* Gender */}
            <Skeleton className="h-4 w-2/3 rounded" /> {/* DOB */}
            <Skeleton className="h-4 w-full rounded" /> {/* Address */}
            <Skeleton className="h-4 w-2/5 rounded" /> {/* Last Login */}
            <Skeleton className="h-3 w-1/2 rounded mt-4" /> {/* Joined On */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition p-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600">
              {admin.firstName} {admin.middleName ?? ''} {admin.lastName}
            </h2>
            <p className="text-gray-500">{admin.email}</p>
            <p className="text-gray-500">{admin.phone}</p>
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex justify-between items-center">
            <DialogTitle className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-emerald-500 to-emerald-600">
              {admin.firstName} {admin.middleName ?? ''} {admin.lastName}
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" className="p-1 rounded-full hover:bg-gray-200">
                <X size={20} />
              </Button>
            </DialogClose>
          </DialogHeader>

          <div className="space-y-3 mt-4 text-sm">
            <p><span className="font-medium text-emerald-500">Email:</span> {admin.email}</p>
            <p><span className="font-medium text-emerald-500">Phone:</span> {admin.phone}</p>
            <p><span className="font-medium text-emerald-500">Gender:</span> {admin.gender}</p>
            <p><span className="font-medium text-emerald-500">Date of Birth:</span> {new Date(admin.dob).toDateString()}</p>
            <p><span className="font-medium text-emerald-500">Address:</span> {admin.address1} {admin.address2 ?? ''}</p>
            {admin.lastLogin && <p><span className="font-medium text-emerald-500">Last Login:</span> {new Date(admin.lastLogin).toLocaleString()}</p>}
            <p className="text-xs text-gray-400">Joined on {new Date(admin.createdAt).toDateString()}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
