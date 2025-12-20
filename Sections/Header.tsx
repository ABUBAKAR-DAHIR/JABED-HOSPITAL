import { HeroHeader } from '@/components/header'
import React from 'react'

export default function Header() {
    const menuItems = [
        { name: 'About us', to: 'about' },
        { name: 'Contact us', to: 'contact' },
        { name: 'Appointment', href: '/patient/registerPatient' },
        { name: 'Dashboard', href: '/patient/dashboard' }
    ]
  return (
    <section>
        <HeroHeader menu={menuItems} />
    </section>
  )
}
