import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Fetch admin info by ID
    const admin = await prisma.admin.findUnique({
      where: { id },
      select: {
        firstName: true,
        middleName: true,
        lastName: true,
        email: true,
        phone: true,
        gender: true,
        dob: true,
        state: true,
        city: true,
        address1: true,
        address2: true,
        lastLogin: true,
        createdAt: true,
      },
    });

    if (!admin) return NextResponse.json({ success: false, error: "Admin not found" });

    return NextResponse.json({ success: true, admin });
  } catch (error: any) {
    console.error("Server error: ", error.message);
    return NextResponse.json({ success: false, error: error.message });
  }
}
