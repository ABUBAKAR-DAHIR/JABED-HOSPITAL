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
        
        
        const content = {
            name: patient.firstName,
            gender: patient.gender,
            state: patient.state,
            phoneNumber: patient.phone,
            dob: patient.dob
        }
    
        return NextResponse.json({success: true, content})

    } catch (error: any) {
        console.log("Server error: ", error.message)
        return NextResponse.json({success: false, error: error.message})
    }

}