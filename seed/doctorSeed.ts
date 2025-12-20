import "dotenv/config"

import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"

async function main() {
  console.log("🌱 Seeding database...")

  // 1️⃣ Create Departments
  await prisma.department.createMany({
    data: [
      { name: "Cardiology" },
      { name: "Neurology" },
      { name: "Orthopedics" },
      { name: "Pediatrics" },
      { name: "Gynecology" },
    ],
    skipDuplicates: true,
  })

  // 2️⃣ Fetch Departments (MUST exist)
  const cardiology = await prisma.department.findUnique({ where: { name: "Cardiology" } })
  const neurology = await prisma.department.findUnique({ where: { name: "Neurology" } })
  const orthopedics = await prisma.department.findUnique({ where: { name: "Orthopedics" } })
  const pediatrics = await prisma.department.findUnique({ where: { name: "Pediatrics" } })
  const gynecology = await prisma.department.findUnique({ where: { name: "Gynecology" } })

  if (!cardiology || !neurology || !orthopedics || !pediatrics || !gynecology) {
    throw new Error("❌ One or more departments were not created properly")
  }

  // 3️⃣ Hash password once
  const passwordHash = await bcrypt.hash("doctor@123", 10)

  // 4️⃣ Create Doctors
  await prisma.doctor.createMany({
    data: [
      {
        firstName: "Ayaan",
        lastName: "Khan",
        phone: "9876543210",
        gender: "Male",
        dob: new Date("1985-04-12"),
        state: "Maharashtra",
        city: "Mumbai",
        address1: "Andheri West",
        email: "ayaan.khan@hospital.com",
        password: passwordHash,
        departmentId: cardiology.id,
      },
      {
        firstName: "Zaid",
        lastName: "Ahmed",
        phone: "9876543211",
        gender: "Male",
        dob: new Date("1983-09-20"),
        state: "Karnataka",
        city: "Bangalore",
        address1: "Indiranagar",
        email: "zaid.ahmed@hospital.com",
        password: passwordHash,
        departmentId: neurology.id,
      },
      {
        firstName: "Faizan",
        lastName: "Shaikh",
        phone: "9876543212",
        gender: "Male",
        dob: new Date("1980-01-15"),
        state: "Gujarat",
        city: "Ahmedabad",
        address1: "Navrangpura",
        email: "faizan.shaikh@hospital.com",
        password: passwordHash,
        departmentId: orthopedics.id,
      },
      {
        firstName: "Ayesha",
        lastName: "Siddiqui",
        phone: "9876543213",
        gender: "Female",
        dob: new Date("1988-07-08"),
        state: "Delhi",
        city: "New Delhi",
        address1: "Jamia Nagar",
        email: "ayesha.siddiqui@hospital.com",
        password: passwordHash,
        departmentId: pediatrics.id,
      },
      {
        firstName: "Zara",
        lastName: "Farooq",
        phone: "9876543214",
        gender: "Female",
        dob: new Date("1986-11-25"),
        state: "Telangana",
        city: "Hyderabad",
        address1: "Banjara Hills",
        email: "zara.farooq@hospital.com",
        password: passwordHash,
        departmentId: gynecology.id,
      },
    ],
    skipDuplicates: true,
  })

  console.log("✅ Database seeded successfully")
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
