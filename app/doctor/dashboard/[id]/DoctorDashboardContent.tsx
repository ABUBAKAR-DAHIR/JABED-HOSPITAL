'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, User, CalendarDays, Bell, Stethoscope } from "lucide-react"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { Route } from "./PageWrapper"
import Image from "next/image"


type AppointmentType = {
  time: string
  patientName: string
  reason: string
  resolved: boolean
}

export type DoctorDashboardType = {
  doctorName: string
  email: string
  department: string
  image: string
  appointments: AppointmentType[]
}

type DashboardProps = {
  dashboard?: DoctorDashboardType
  onNavigate: (route: Route) => void
}

export default function DoctorDashboardContent({ dashboard, onNavigate }: DashboardProps) {
  if (!dashboard) {
    // Loading skeleton
    return (
      <div className="flex flex-col gap-6 p-4 pt-0">
        <Skeleton className="h-8 w-full xl:w-1/3" />
        <div className="grid md:grid-cols-3 gap-4">
          {[0, 1, 2].map(i => (
            <Card key={i} className="p-4 animate-pulse">
              <CardHeader className="flex gap-4 pb-2">
                <Skeleton className="h-6 w-6 rounded-xl" />
                <Skeleton className="h-5 w-28 rounded-xl" />
              </CardHeader>
              <CardContent className="pt-2">
                <Skeleton className="h-4 w-full rounded-xl" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const upcomingAppointments = dashboard.appointments.filter(a => !a.resolved)
  const completedAppointments = dashboard.appointments.filter(a => a.resolved)

  return (
    <div className="flex flex-col gap-6 p-4 pt-0">

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold px-4 py-4"
      >
        Welcome, Dr. {dashboard.doctorName} 👋
      </motion.h1>

      {/* Top Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        {[{
          title: "Doctor",
          icon: <div className="relative h-12 w-12 overflow-hidden rounded-full shrink-0">
                  <Image
                    src={dashboard.image}
                    alt="doctor_image"
                    fill
                    className="object-cover"
                  />
                </div>,
          // icon: <Image src={dashboard.image} width={50} height={50}  className=" rounded-full object-cover" alt="doctor_image" />,
          info: "Dr. " + dashboard.doctorName,
          nav: "profile"
        },{
          title: "Email",
          icon: <User className="h-6 w-6 text-blue-600" />,
          info: dashboard.email,
          nav: "profile"
        },{
          title: "Department",
          icon: <CalendarDays className="h-6 w-6 text-emerald-600" />,
          info: dashboard.department ?? "Unassigned",
          nav: "profile"
        },{
          title: "Upcoming Appointments",
          icon: <Clock className="h-6 text-amber-600" />,
          info: `${upcomingAppointments.length} upcoming`,
          nav: "appointments"
        }].map((item, i) => (
          <Card key={i} className="cursor-pointer hover:shadow-lg p-4 w-full" onClick={() => onNavigate(item.nav as Route)}>
            <CardHeader className="flex gap-4 pb-2 items-center">{item.icon}<CardTitle>{item.title}</CardTitle></CardHeader>
            <CardContent className="text-muted-foreground pt-2">{item.info}</CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Upcoming Appointments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingAppointments.length === 0 ? (
            <p>No upcoming appointments</p>
          ) : (
            upcomingAppointments.map((appt, i) => (
              <div key={i} className="flex justify-between items-center border rounded-lg p-3">
                <div>
                  <p className="font-semibold">{new Date(appt.time).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{appt.patientName} - {appt.reason}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => onNavigate("appointments")}>View</Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Completed Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Completed Appointments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {completedAppointments.length === 0 ? (
            <p>No completed appointments</p>
          ) : (
            completedAppointments.map((appt, i)=> (
              <div key={i} className="flex justify-between items-center border rounded-lg p-3">
                <div>
                  <p className="font-semibold">{new Date(appt.time).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{appt.patientName} - {appt.reason}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => onNavigate("appointments")}>View</Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

    </div>
  )
}
