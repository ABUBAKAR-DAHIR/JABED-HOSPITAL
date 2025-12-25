// app/api/admin/dashboard/[adminId]/patientsInfo/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { adminId: string } }) {
  try {
    // Fetch all patients
    const patients = await prisma.patient.findMany()

    // Map the patients to a simplified object (optional, can send as-is)
    const patientsInfo = patients.map((p) => ({
      id: p.id,
      firstName: p.firstName,
      middleName: p.middleName,
      lastName: p.lastName,
      phone: p.phone,
      gender: p.gender,
      dob: p.dob.toISOString(),
      state: p.state,
      city: p.city,
      address1: p.address1,
      address2: p.address2,
      allergies: p.allergies,
      medications: p.medications,
      surgeries: p.surgeries,
      chronicConditions: p.chronicConditions,
      notes: p.notes,
      createdAt: p.createdAt.toISOString(),
    }));

    return NextResponse.json({ success: true, patientsInfo });
  } catch (error: any) {
    console.error("Server error:", error.message);
    return NextResponse.json({ success: false, error: error.message });
  }
}
