import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server"

export async function POST(req: Request){
    const { name, phoneNumber, finalDate, time, reason } = await req.json()

    try {
        // ✅ Auth
        const { getUser } = getKindeServerSession();
        const kindeUser = await getUser();

        if (!kindeUser) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const isPatient = await prisma.patient.findUnique({
            where: {
                kindId: kindeUser.id
            }
        })

        if (!isPatient) {
            return NextResponse.json(
                { success: false, error: 'Patient not found!' },
                { status: 404 }
            );
        }

        const appointmentDate = new Date(finalDate) // parse ISO string

        const appointment = await prisma.appointment.create({
            data: {
                patientId: isPatient.id,
                fullName: name,
                phoneNumber: phoneNumber,
                time: appointmentDate,
                reason: reason
            }
        })

        return NextResponse.json({success: true, message: 'Appointment set!', appointment})

    } catch (error: any) {
        console.log("Server error: ", error.message)
        return NextResponse.json({success: false, error: error.message})
    }
}