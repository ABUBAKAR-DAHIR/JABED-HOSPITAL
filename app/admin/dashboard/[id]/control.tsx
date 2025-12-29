'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Stethoscope,
  CalendarDays,
  Building2,
  ShieldCheck
} from "lucide-react"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

export type AdminDashboardType = {
  adminName: string
  email: string
  gender: string
  imageUrl: string
  stats: {
    doctors: number
    patients: number
    appointments: number
    departments: number
  }
}

type Props = {
  dashboard?: AdminDashboardType
  onNavigate?: (route: any) => void
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 }
}

export default function AdminDashboardContent({ dashboard }: Props) {

  if (!dashboard) {
    return (
      <div className="flex flex-col gap-8 p-4 pt-0 md:px-10">

      {/* 🌟 Header Skeleton */}
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl border p-6 animate-pulse flex flex-col md:flex-row items-start gap-4">
        <div className="p-3 rounded-xl bg-gray-200 flex items-center justify-center">
          <Skeleton className="h-7 w-7 rounded-full" />
        </div>

        <div className="flex-1 space-y-2 w-full">
          <Skeleton className="h-8 w-3/4 rounded-lg" /> {/* Welcome message */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-16 rounded-full" /> {/* Gender Badge */}
          </div>
          <Skeleton className="h-4 w-1/2 rounded-md mt-2" /> {/* Email */}
        </div>
      </div>

      {/* 📊 Stats Cards Skeleton */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-xl p-4 flex flex-col gap-4 animate-pulse shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-24 rounded" /> {/* Title */}
              <Skeleton className="h-6 w-6 rounded-full" /> {/* Icon circle */}
            </div>

            <div className="space-y-2">
              <Skeleton className="h-10 w-1/2 rounded-lg" /> {/* Value */}
              <Skeleton className="h-3 w-3/4 rounded-md" /> {/* Subtitle */}
            </div>
          </div>
        ))}
      </div>
    </div>
    )
  }

  const { stats } = dashboard

  return (
    <div className="flex flex-col gap-8 p-4 pt-0 md:px-10">

      {/* 🌟 Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-7/8 mx-auto overflow-hidden rounded-2xl border p-6"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 max-md:p-2 rounded-xl bg-primary/10">
            <ShieldCheck className="h-7 w-7 text-primary max-md:size-4" />
          </div>

          <div>
            <h1 className="text-3xl max-md:text-2xl font-bold tracking-tight">
              Welcome, {dashboard.adminName}
            </h1>

            <div className="">
              <Badge variant="default" className="max-md:text-[10px]">
                {dashboard.gender}
              </Badge>

              <p className="text-sm text-muted-foreground py-4">
                {dashboard.email}
              </p>

            </div>
          </div>
        </div>
      </motion.div>

      {/* 📊 Stats Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {[
          {
            title: "Doctors",
            value: stats.doctors,
            icon: <Stethoscope className="text-blue-600" />,
            subtitle: "Registered doctors"
          },
          {
            title: "Patients",
            value: stats.patients,
            icon: <Users className="text-emerald-600" />,
            subtitle: "Active patients"
          },
          {
            title: "Appointments",
            value: stats.appointments,
            icon: <CalendarDays className="text-amber-600" />,
            subtitle: "Total appointments"
          },
          {
            title: "Departments",
            value: stats.departments,
            icon: <Building2 className="text-purple-600" />,
            subtitle: "Hospital departments"
          }
        ].map((card, i) => (
          <motion.div key={i} variants={item}>
            <Card className="hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                {card.icon}
              </CardHeader>

              <CardContent>
                <p className="text-3xl font-bold">{card.value}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.subtitle}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

    </div>
  )
}
