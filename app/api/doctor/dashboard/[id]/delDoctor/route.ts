import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    try {
        const {id} = await req.json()
        if(!id) return NextResponse.json({success: false, error: "No Doctor Id provided"})
        const doctor = await prisma.doctor.findUnique({
            where: {
                id: id
            }
        })
    
        if(!doctor) return NextResponse.json({success: false, error: "No Doctor found!"})
        
        const delDoctor = await prisma.doctor.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({success: true, delDoctor})
        
    } catch (error: any) {
        console.error("Server error: ", error.message)
        return NextResponse.json({success: false, error: `Backend Error: ${error.message}`})
    }
}