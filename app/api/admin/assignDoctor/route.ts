import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

// assigning a doctor from the admin dashboard
export async function POST(req: Request){
    try {
        const {doctor, appointmentId} = await req.json()
        if(!doctor) return NextResponse.json({success: false, error: "doctor items"})
        if(!appointmentId) return NextResponse.json({success: false, error: "Missing items"})
        
        const appointment = await prisma.appointment.findUnique({
            where: {
                id: appointmentId
            }
        })

        if(!appointment) return NextResponse.json({success: false, error: "No appointment Found"})
        
        const doctorr = await prisma.doctor.findUnique({
            where: {
                id: doctor
            }
        })

        if(!doctorr) return NextResponse.json({success: false, error: "Doctor not found"})
        const assignDoctor = await prisma.appointment.update({
            where: {
                id: appointment.id
            },
            data: {
                doctor: {
                    connect: {
                        id: doctor
                    }
                }
            }
        })

        
        return NextResponse.json({success: true, assignDoctor})
    } catch (error: any) {
        console.error("Server error: ", error.message)
        return NextResponse.json({success: false, error: error.message})
    }
}