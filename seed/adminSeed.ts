import "dotenv/config"

import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"

async function main() {
  console.log("🌱 Seeding database...")

  // 3️⃣ Hash password once
  const passwordHash = await bcrypt.hash("admin@123", 10)

  // 4️⃣ Create Admin
  await prisma.admin.create({
    data: {
      firstName: "Altaf",
      lastName: "Hussein",
      phone: "+91 77538 34571",
      gender: "Male",
      dob: new Date("2007-04-12"),
      state: "Kathmandu",
      city: "Kathmandu",
      address1: "Jyatha Marg, Ward 26, Thamel, Kathmandu",
      address2: "Baneshwor, Kathmandu",
      email: "hussainmusalmanaltaf@gmail.com",
      password: passwordHash,   
    }
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
