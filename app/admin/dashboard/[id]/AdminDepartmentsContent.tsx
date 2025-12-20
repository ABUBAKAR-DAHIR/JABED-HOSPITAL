'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

/* =======================
   Types
======================= */

export type AdminDoctorInfoType = {
  firstName?: string
  lastName?: string
  gender?: string
  state?: string
  phoneNumber?: string
  dob?: string | Date
  department?: string
}

export type DepartmentProps = {
  deptName: string
  createdAt: Date | string
  appointments: number
  deptDoctor: AdminDoctorInfoType
}

type AdminDepartmentProps = {
  departments?: DepartmentProps[] | null
}

/* =======================
   Skeletons
======================= */

function DepartmentCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="flex flex-row items-center justify-between">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
    </Card>
  )
}

function DepartmentsSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <DepartmentCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

/* =======================
   Component
======================= */

export default function DepartmentsContent({
  departments,
}: AdminDepartmentProps) {

  // ⏳ Loading (undefined OR null)
  if (!departments) {
    return <DepartmentsSkeleton />
  }

  // 📭 Loaded but empty
  if (departments.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No departments available
      </div>
    )
  }

  // ✅ Loaded with data
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Departments
        </h2>
        <p className="text-sm text-muted-foreground">
          Hospital department overview
        </p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {departments.map((dept, index) => {
          const hasDoctor =
            !!dept.deptDoctor?.firstName &&
            !!dept.deptDoctor?.lastName

          return (
            <Card key={index} className="hover:shadow-lg transition-all">
              <CardHeader className="flex justify-between">
                <CardTitle>{dept.deptName}</CardTitle>
                <Badge variant={hasDoctor ? "default" : "secondary"}>
                  {hasDoctor ? "Assigned" : "Unassigned"}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>
                    {new Date(dept.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Appointments</span>
                  <span>{dept.appointments}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Doctor</span>
                  <span>
                    {hasDoctor
                      ? `${dept.deptDoctor.firstName} ${dept.deptDoctor.lastName}`
                      : "Not Assigned"}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
