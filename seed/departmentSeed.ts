// seed/departmentsSeed.ts
import "dotenv/config"
import prisma from "@/lib/prisma"

async function main() {
  console.log("🌱 Seeding departments...")

  const departments = [
    // "Cardiology",
    // "Neurology",
    // "Orthopedics",
    // "Pediatrics",
    // "Gynecology",
    "Pharmacology"
  ]

  for (const name of departments) {
    const existing = await prisma.department.findUnique({ where: { name } })
    if (!existing) {
      await prisma.department.create({
        data: { name },
      })
      console.log(`✅ Department created: ${name}`)
    } else {
      console.log(`⚠️ Department already exists: ${name}`)
    }
  }

  console.log("🌱 Departments seeding finished!")
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
