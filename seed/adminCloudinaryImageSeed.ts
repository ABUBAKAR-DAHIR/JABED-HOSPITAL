import "dotenv/config"
import { v2 as cloudinary } from "cloudinary"
import path from "path"
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

async function uploadAdminImage() {
  // __dirname = seed/
  const absolutePath = path.join(
    __dirname,
    "../public/altaf_image.jpeg"
  )

  console.log("📂 Trying to upload:", absolutePath)

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`❌ File not found at ${absolutePath}`)
  }

  const result = await cloudinary.uploader.upload(absolutePath, {
    folder: "admins",
  })

  console.log("✅ Image uploaded successfully")
  console.log("🔗 URL:", result.secure_url)

  return result.secure_url
}

;(async () => {
  try {
    await uploadAdminImage()
    console.log("🌱 Seeding ended successfully!")
  } catch (error: any) {
    console.error("❌ ERROR:", error.message)
  }
})()
