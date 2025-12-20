import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const {username, password} = await req.json()
        console.log(username)
        
        const admin = await prisma.admin.findUnique({
            where: {
                email: username
            }
        })

        if(!admin) return NextResponse.json({success: false, error: "Admin not found"})

        const isadmin = await bcrypt.compare(password, admin.password)
        if(!isadmin) return NextResponse.json({success: false, error: "Wrong password found"})
        
    
        return NextResponse.json({success: true, message: "Correct credentials", id: admin.id})

    } catch (error: any) {
        console.log("Server error: ", error.message)
        return NextResponse.json({success: false, error: error.message})
    }

}