import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(req: Request) {
  try {
    const { appointmentId, resolved } = await req.json()

    if (!appointmentId) {
      return NextResponse.json({
        success: false,
        error: "Missing appointmentId",
      })
    }

    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { resolved },
    })

    return NextResponse.json({
      success: true,
      appointment,
    })
  } catch (error: any) {
    console.error("Server error:", error.message)
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
