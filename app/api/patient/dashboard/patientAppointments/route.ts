import prisma from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const { getUser } = getKindeServerSession()
    const kindeUser = await getUser()

    if (!kindeUser)
      return NextResponse.json({ success: false, error: "Unauthorized" })

    const patient = await prisma.patient.findUnique({
      where: { kindId: kindeUser.id },
    })

    if (!patient)
      return NextResponse.json({ success: false, error: "Patient not found" })

    const appointments = await prisma.appointment.findMany({
      where: { patientId: patient.id },
      include: {
        doctor: true,
        department: true,
      },
      orderBy: { time: "desc" },
    })

    const formattedAppointments = appointments.map(a => ({
      id: a.id,
      time: a.time.toISOString(),
      reason: a.reason,
      resolved: a.resolved,
      doctor: a.doctor
        ? `${a.doctor.firstName} ${a.doctor.lastName}`
        : "Unassigned",
      department: a.department?.name ?? "N/A",
    }))

    return NextResponse.json({
      success: true,
      appointments: formattedAppointments,
    })
  } catch (error: any) {
    console.error("Server error:", error.message)
    return NextResponse.json({ success: false, error: error.message })
  }
}
