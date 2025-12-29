import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request, {params} : {params: Promise<{id: string}>}){
    try {
        const paramss = await params
        const id = paramss.id
        if(!id) return NextResponse.json({success: false, error: 'No params id'})
        
        const doctor = await prisma.doctor.findUnique({
            where: {
                id: id
            }
        })
    
        if(!doctor) return NextResponse.json({success: false, error: 'No doctor found!'})
    
        const appointments = await prisma.appointment.findMany({
            where: {
                doctor: {
                    id: doctor.id
                }
            },
            orderBy: {
                time: 'asc'
            }
        })

        // const finalAppointments = appointments.map(appointment => ({
        //     id: appointment.id,
        //     fullName: string
        //     phoneNumber: string
        //     time: string
        //     reason: string
        //     resolved: boolean
        // }))
    
        return NextResponse.json({success: true, appointments})
        
    } catch (error: any) {
        console.log("Server error: ", error.message)
        return NextResponse.json({success: false, error: error.message})

    }
}