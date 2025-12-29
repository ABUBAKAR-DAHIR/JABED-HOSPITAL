'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export type DoctorAppointmentType = {
  id: string
  fullName: string
  phoneNumber: string
  time: string
  reason: string
  resolved: boolean
}

export default function AppointmentsContent({
  appointments,
}: {
  appointments?: DoctorAppointmentType[]
}) {
  const loading = !appointments
  console.log("appointmentssss: ", appointments)
  return (
    <div className="p-4 flex justify-center">
      {loading ? (
        <div className="w-full max-w-5xl space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <Card className="w-full max-w-3xl p-8 text-center text-gray-500">
          No appointments assigned yet.
        </Card>
      ) : (
        <div className="w-full max-w-5xl grid gap-4 md:grid-cols-2">
          {appointments.map((appointment) => (
            <Card
              key={appointment.id}
              className="rounded-2xl border shadow hover:shadow-md transition"
            >
              <CardHeader className="pb-2 flex flex-row justify-between items-center">
                <CardTitle className="text-lg">
                  {appointment.fullName}
                </CardTitle>
                <Badge
                  variant={appointment.resolved ? "default" : "destructive"}
                >
                  {appointment.resolved ? "Resolved" : "Pending"}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p>📞 {appointment.phoneNumber}</p>
                <p>🕒 {new Date(appointment.time).toLocaleString()}</p>
                <p className="text-gray-700 dark:text-gray-200">
                  {appointment.reason}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
