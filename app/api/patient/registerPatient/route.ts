import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma";


const clean = (v?: string) =>
  v && v.trim() !== "" ? v : undefined;

export async function POST(req: Request) {
  try {
    // ✅ Parse JSON body correctly
    const body = await req.json();

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

    if (isPatient) {
        return NextResponse.json(
            { success: true, alreadyRegistered: true },
            { status: 200 }
        );
    }

    

    // ✅ Create patient
    const patient = await prisma.patient.create({
      data: {
        kindId: kindeUser.id,

        // required
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        gender: body.gender,
        state: body.state,
        city: body.city,
        address1: body.address1,

        // date conversion (VERY IMPORTANT)
        dob: new Date(body.dob),

        // optional (cleaned)
        middleName: clean(body.middleName),
        address2: clean(body.address2),
        allergies: clean(body.allergies),
        medications: clean(body.medications),
        surgeries: clean(body.surgeries),
        chronicConditions: clean(body.chronicConditions),
        notes: clean(body.notes),
      },
    });

    return NextResponse.json({
      success: true,
      patient,
    });
  } catch (error: any) {
    console.error("Server error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
