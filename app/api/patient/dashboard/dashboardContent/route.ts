import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async  function GET(req: Request) {
    try {
        const {getUser} = getKindeServerSession()
        const kindeUser = await getUser()
        if(!kindeUser) return NextResponse.json({success: false, error: "Kinde Patient not found!"})
        
        const patient = await prisma.patient.findUnique({
            where: {
                kindId: kindeUser.id
            }
        })
    
        
        if(!patient) return NextResponse.json({success: false, error: "Patient not found!"})
        
        const appointments = await prisma.appointment.findMany({
            where: {
                patientId: patient.id
            },
            include: {doctor: true},
            orderBy: {time: 'asc'}
        })

        // if(appointments.length === 0) return NextResponse.json({success: true, error: "No appointments!"})

        const lastAppointment = appointments.length > 0 ? appointments[appointments.length-1] : null
        const visits = appointments.filter(appointment => appointment.resolved && ({
            time: appointment.time,
            assignedDoctor: appointment.doctor && appointment.doctor?.firstName + " " + appointment.doctor?.lastName
        }))

        const content = {
            patientName: patient.firstName,
            nextAppointment: lastAppointment && lastAppointment.resolved === false ? lastAppointment.time : null,
            assignedDoctor: lastAppointment && lastAppointment.resolved === false ? lastAppointment.doctor?.firstName + " " + lastAppointment.doctor?.lastName : null,
            visits: visits
        }
    
        return NextResponse.json({success: true, content})

    } catch (error: any) {
        console.log("Server error: ", error.message)
        return NextResponse.json({success: false, error: error.message})
    }

}