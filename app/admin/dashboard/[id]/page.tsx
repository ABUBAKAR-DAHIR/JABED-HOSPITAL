import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import CantAccess from "./CantAccess"
import PageWrapper from "./PageWrapper"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const newPara = await params
  const id = newPara.id

  const admin = await prisma.admin.findUnique({
    where: {id: id}
  })

  if (!admin) return <CantAccess />

  return <PageWrapper kindeUser={admin} />
}
