import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"
import cloudinary from "@/lib/cloudinary"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    // ===== Extract fields =====
    const firstName = formData.get("firstName") as string
    const middleName = formData.get("middleName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const gender = formData.get("gender") as string
    const dob = formData.get("dob") as string
    const state = formData.get("state") as string
    const city = formData.get("city") as string
    const address1 = formData.get("address1") as string
    const address2 = formData.get("address2") as string | null
    const department = formData.get("department") as string
    const imageFile = formData.get("image") as File | null

    // ===== Basic validation =====
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !gender ||
      !dob ||
      !state ||
      !city ||
      !address1 ||
      !department ||
      !imageFile
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // ===== Set default password =====
    const defaultPassword = "doctor@123"
    const hashedPassword = await bcrypt.hash(defaultPassword, 10)

    // ===== Upload image to Cloudinary =====
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadRes: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "doctors",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    // ===== Save doctor in DB =====
    const doctor = await prisma.doctor.create({
      data: {
        firstName,
        middleName,
        lastName,
        email,
        phone,
        gender,
        dob: new Date(dob),
        state,
        city,
        address1,
        address2,
        password: hashedPassword,
        imageUrl: uploadRes.secure_url,
        department: {
          connect: { name: department },
        },
      },
    })

    return NextResponse.json({ success: true, doctor})
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({ success: false, error: error.message}, { status: 500 }
    )
  }
}
