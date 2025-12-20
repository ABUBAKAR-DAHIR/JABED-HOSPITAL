import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request, {params} : {params: Promise<{id: string}>}){
    try {
        const newPara = await params
        const id = newPara.id
    
        if(!id) return NextResponse.json({success: false, error: 'No params id'})
    
        const admin = await prisma.admin.findUnique({
            where: {id: id},
        })
    
        if(!admin) return NextResponse.json({success: false, error: 'Invalid admin id'})

        
    
        const departments = await prisma.department.findMany({include: {appointments: true}})
        const doctors = await prisma.doctor.findMany()
        const appointments = await prisma.appointment.findMany()


        
        const departmentInfo = departments.map( department => {
            const deptDoctor = doctors.find(doctor => doctor.id === department.id)
            return {
                deptName: department.name,
                createdAt: department.createdAt,
                appointments: department.appointments.length,
                deptDoctor: {
                    firstName: deptDoctor?.firstName,
                    lastName: deptDoctor?.lastName,
                    gender: deptDoctor?.gender,
                    state: deptDoctor?.state,
                    phoneNumber: deptDoctor?.phone,
                    dob: deptDoctor?.dob,
                    department: deptDoctor?.departmentId,
                }
            }
        })
    
        return NextResponse.json({success: true, departmentInfo})
        
    } catch (error: any) {
        console.log("Server error: ", error.message)
        return NextResponse.json({success: false, error: error.message})
    }

}