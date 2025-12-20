import prisma from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import RegisterPatient from './RegisterPatient';

export default async function page() {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser) redirect('/')

    const isPatient = await prisma.patient.findUnique({
        where: {
            kindId: kindeUser.id
        }
    })

    const patientId = isPatient?.id

    if (isPatient) redirect(`/patient/appointments`)
    


  return <RegisterPatient /> 
}
