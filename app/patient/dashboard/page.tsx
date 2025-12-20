import PageWrapper from "./PageWrapper"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import CantAccess from "./CantAccess"

export default async function Page() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user?.id) redirect("/")

  const patient = await prisma.patient.findUnique({
    where: { kindId: user.id }
  })

  if (!patient) return <CantAccess />

  return <PageWrapper kindeUser={user} />
}
