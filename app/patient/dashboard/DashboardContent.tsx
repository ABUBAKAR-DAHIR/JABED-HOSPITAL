'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CalendarDays, Bell, Stethoscope } from "lucide-react"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { Route } from "./PageWrapper"

type VisitType = {
  time: string
  assignedDoctor: string
}

export type PatientDashboardType = {
  patientName: string
  nextAppointment: string
  assignedDoctor: string
  visits: VisitType[]
}

type DashboardProps = {
  dashboard?: PatientDashboardType
  onNavigate: (route: Route) => void
}

export default function DashboardContent({ dashboard, onNavigate }: DashboardProps) {
  return (
    <div className="flex flex-col gap-6 p-4 pt-0">

      {/* Header */}
      {!dashboard ? (
        <Skeleton className="h-8 w-full xl:w-1/3" />
      ) : (
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold px-4 py-4"
        >
          Welcome, {dashboard.patientName} 👋
        </motion.h1>
      )}

      {/* Top Cards */}
      {
        !dashboard ? (
          <div className="grid md:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <Card key={i} className="cursor-pointer hover:shadow-lg p-4">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Skeleton className="h-6 w-6 rounded-xl" /> {/* Icon placeholder */}
                  <Skeleton className="h-5 w-28 rounded-xl" /> {/* Title placeholder */}
                </CardHeader>
                <CardContent className="text-muted-foreground pt-2">
                  <Skeleton className="h-4 w-full rounded-xl" /> {/* Info placeholder */}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Next Appointment",
                icon: <Clock className="h-6 w-6 text-blue-600" />,
                info: dashboard?.nextAppointment ?? "No appointment",
                nav: "appointments",
              },
              {
                title: "Doctor Assigned",
                icon: <CalendarDays className="h-6 w-6 text-emerald-600" />,
                info: dashboard?.assignedDoctor ?? "Unassigned",
                nav: "patient-info",
              },
              {
                title: "Health Alerts",
                icon: <Bell className="h-6 w-6 text-amber-600" />,
                info: "No alerts",
                nav: "health-notifications",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="cursor-pointer hover:shadow-lg p-4"
                onClick={() => onNavigate(item.nav as Route)}
              >
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  {item.icon}
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground pt-2">
                  {item.info}
                </CardContent>
              </Card>
            ))}
          </div>
        )
      }


      {/* Visits */}
<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Stethoscope className="h-5 w-5" />
      Your Visits
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-3">
    {!dashboard || !dashboard.visits  ? (
      // Skeletons when no visits exist yet
      [0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex justify-between items-center border rounded-lg p-3 animate-pulse"
        >
          <div>
            <Skeleton className="h-4 w-24 mb-1 rounded" /> {/* Time */}
            <Skeleton className="h-3 w-32 rounded" /> {/* Doctor */}
          </div>
          <Skeleton className="h-8 w-16 rounded" /> {/* View button */}
        </div>
      ))
    ) : dashboard.visits.length === 0 ? <p>No visits</p>
    : (
      // Actual visits
      dashboard.visits.map((visit, i) => (
        <div
          key={i}
          className="flex justify-between items-center border rounded-lg p-3"
        >
          <div>
            <p className="font-semibold">{visit.time}</p>
            <p className="text-sm text-muted-foreground">
              Dr. {visit.assignedDoctor}
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("appointments")}
          >
            View
          </Button>
        </div>
      ))
    )}
  </CardContent>
</Card>

    </div>
  )
}
