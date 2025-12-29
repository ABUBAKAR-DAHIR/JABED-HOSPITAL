import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request, {params} : {params: Promise<{id: string}>}){
    try {
        const newPara = await params
        const id = newPara.id
    
        if(!id) return NextResponse.json({success: false, error: 'No params id'})
    
        const doctor = await prisma.doctor.findUnique({
            where: {id: id},
            include: {appointments: true}
        })
    
        if(!doctor) return NextResponse.json({success: false, error: 'Invalid doctor id'})
        if(!doctor.departmentId) return NextResponse.json({success: false, error: 'Invalid or No Department id'})
        
        const department = await prisma.department.findUnique({
            where: {
                id: doctor.departmentId
            }
        })
    
        const appointments = doctor.appointments.map(appointment => {
            return {
                time: appointment.time,
                patientName: appointment.fullName,
                reson: appointment.reason,
                resold: appointment.resolved
            }
        })
        

        const doctorInfo = {
            doctorName: doctor.firstName,
            gender: doctor.gender,
            email: doctor.email,
            state: doctor.state,
            dob:doctor.dob,
            phoneNumber: doctor.phone,
            department: department?.name,
            appointments: appointments.length
        }
    
        return NextResponse.json({success: true, doctorInfo})
        
    } catch (error: any) {
        console.log("Server error: ", error.message)
        return NextResponse.json({success: false, error: error.message})
    }

}