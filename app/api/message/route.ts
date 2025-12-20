import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
export const runtime = 'nodejs'
export async function POST(req: Request){
    try {
        const {name, email, phone, message} = await req.json()
        if(!name || !email || !phone || !message) return NextResponse.json({success: false, error: "Missing items!"}, {status: 400})
        
        const mainMessage = await prisma.message.create({
            data: {
                name: name,
                email: email,
                phone: phone,
                message: message
            }
        })

        return NextResponse.json({success: true, message: mainMessage })
    } catch (error: any) {
        console.error("server error: " , error.message)
        return NextResponse.json({success: false, error: error.message})
    }
}