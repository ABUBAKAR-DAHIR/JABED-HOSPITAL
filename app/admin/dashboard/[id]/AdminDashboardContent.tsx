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
      <div className="p-4 space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
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
          <div className="p-3 rounded-xl bg-primary/10">
            <ShieldCheck className="h-7 w-7 text-primary" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome, {dashboard.adminName}
            </h1>

            <div className="">
              <Badge variant="default">
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
