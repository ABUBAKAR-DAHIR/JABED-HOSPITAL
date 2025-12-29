import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true,
        doctor: true,
        department: true,
      },
      orderBy: { time: "desc" }
    })

    const doctors = await prisma.doctor.findMany()

    const formattedAppointments = appointments.map(a => ({
      id: a.id,
      fullName: a.fullName,
      phoneNumber: a.phoneNumber,
      time: a.time.toISOString(),
      reason: a.reason,
      resolved: a.resolved,
      // assignedDoctor: a.doctor,
      assignedDoctor: a.doctor ? a.doctor.firstName + " " + a.doctor.lastName : null,
      doctors: doctors.map(doc => ({
        name: doc.firstName + " " + doc.lastName,
        docId: doc.id
      })),
      createdAt: a.createdAt.toISOString()
    }))

    return NextResponse.json({ success: true, appointments: formattedAppointments })
  } catch (error: any) {
    console.error("Server error: ", error.message)
    return NextResponse.json({ success: false, error: error.message })
  }
}
