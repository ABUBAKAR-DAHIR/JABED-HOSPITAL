import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { startOfDay, endOfDay, addDays } from 'date-fns'

export async function GET(req: Request, {params} : {params: Promise<{id: string}>}){
    try {
        const newPara = await params
        const id = newPara.id
    
        if(!id) return NextResponse.json({success: false, error: 'No params id'})
    
        const admin = await prisma.admin.findUnique({
            where: {id: id},
        })
    
        if(!admin) return NextResponse.json({success: false, error: 'Invalid admin id'})
        
    
        const appointments = await prisma.appointment.findMany()
        const doctors = await prisma.doctor.findMany()
        const departments = await prisma.department.findMany()
        const patients = await prisma.patient.findMany()

        appointments.map(appointment => {
            return {
                time: appointment.time,
                patientName: appointment.fullName,
                reson: appointment.reason,
                resold: appointment.resolved
            }
        })
        

        const now = new Date()

        const todayStart = startOfDay(now)
        const todayEnd = endOfDay(now)

        const tomorrowStart = startOfDay(addDays(now, 1))
        const tomorrowEnd = endOfDay(addDays(now, 1))

        const todayAppointments = await prisma.appointment.findMany({
        where: {
            time: {
            gte: todayStart,
            lte: todayEnd,
            },
        },
        })

        const tomorrowAppointments = await prisma.appointment.findMany({
        where: {
            time: {
            gte: tomorrowStart,
            lte: tomorrowEnd,
            },
        },
        })

        const upcomingAppointments = await prisma.appointment.findMany({
        where: {
            time: {
            gt: tomorrowEnd,
            },
        },
        })


        const adminInfo = {
            adminName: admin.firstName,
            email: admin.email,
            gender: admin.gender,
            imageUrl: admin.imageUrl,
            stats: {
                doctors: doctors.length,
                patients: patients.length,
                appointments: appointments.length,
                departments: departments.length,
                todayAppointments: todayAppointments.length,
                tomorrowAppointments: tomorrowAppointments.length,
                upcomingAppointments: upcomingAppointments.length,
            }
        }
    
        return NextResponse.json({success: true, adminInfo})
        
    } catch (error: any) {
        console.log("Server error: ", error.message)
        return NextResponse.json({success: false, error: error.message})
    }

}