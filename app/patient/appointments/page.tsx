import React from 'react'
import BookingPage from './BookingPage'
import { redirect } from 'next/navigation'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import prisma from '@/lib/prisma'

export default async function page() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    if(!user) redirect('/')

    const isPatient = await prisma.patient.findUnique({
      where: {
          kindId: user.id
      }
    })

    const id = isPatient?.id
    if(!id) redirect('/patient/registerPatient')

    const patientAlreadyAppointed = await prisma.patient.findFirst({
      where: {
        kindId: user.id,
        appointments: {
          some: {
            resolved: false
          }
        }
      }
    })

    if(patientAlreadyAppointed) redirect(`/patient/dashboard`)

  return (
    <BookingPage id={id}/>
  )
}
