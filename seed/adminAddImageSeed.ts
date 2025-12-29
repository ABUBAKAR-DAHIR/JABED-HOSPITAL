import "dotenv/config"

import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"

async function main() {
  console.log("🌱 Seeding database...")


  // 4️⃣ Edit Admin
  const admin = await prisma.admin.findUnique({
    where: {
        id: '94b26ee4-251c-4939-a9bd-b6b898b3fda5'
    }
    
  })
  

  if(!admin) console.log("No admin found")

    await prisma.admin.update({
        where: {
            id: admin?.id
        },
        data: {
            imageUrl: 'https://res.cloudinary.com/dstxmhwmy/image/upload/v1766669879/admins/lak0gl3svksanap3s8vp.jpg'
        }
    })

   console.log("Admin Found! ", admin?.firstName)

//    admin.
   
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
