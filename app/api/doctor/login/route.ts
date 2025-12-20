import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const {username, password} = await req.json()
        console.log(username)
        
        const doctor = await prisma.doctor.findUnique({
            where: {
                email: username
            }
        })

        if(!doctor) return NextResponse.json({success: false, error: "Doctor not found"})

        const isDoctor = await bcrypt.compare(password, doctor.password)
        if(!isDoctor) return NextResponse.json({success: false, error: "Wrong password found"})
        
    
        return NextResponse.json({success: true, message: "Correct credentials", id: doctor.id})

    } catch (error: any) {
        console.log("Server error: ", error.message)
        return NextResponse.json({success: false, error: error.message})
    }

}