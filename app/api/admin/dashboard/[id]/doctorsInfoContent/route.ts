import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request){
    try {
        const doctors = await prisma.doctor.findMany({include: {department: true}})

        const doctorsInfo = doctors.map(doctor => {
            return {
                id: doctor.id,
                firstName: doctor.firstName,
                middleName: doctor.middleName,
                lastName: doctor.lastName,
                imageUrl: doctor.imageUrl,
                email: doctor.email,
                phone: doctor.phone,
                gender: doctor.gender,
                city: doctor.city,
                state: doctor.state,
                department: {
                    name: doctor.department?.name
                },
                createdAt: doctor.createdAt
            }
        })

        return NextResponse.json({success: true, doctorsInfo})
    } catch (error: any) {
        console.error("Server error: ", error.message)
        return NextResponse.json({success: false, error: error.message})
    }
}