'use client'
import * as React from "react"
// import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { BookOpen, House, SquareTerminal, AudioWaveform, Settings2, Bell } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "./ui/sidebar"
import { Route } from "../app/patient/dashboard/PageWrapper"

const navItems = [
  { id: "dashboard", title: "Dashboard", icon: SquareTerminal },
  { id: "doctor-info", title: "Doctor Info", icon: BookOpen },
  { id: "appointments", title: "Appointments", icon: Settings2 },
  { id: "notifications", title: "Notifications", icon: Bell },
]


// i put it any type to remove the typescript complaints

interface AppSidebarProps {
  active: string
  setActive: (id: Route) => void
  user : {
    given_name?: string | undefined | any
    email?: string | undefined | any
    image?: string | undefined | any
  }
}

export function DoctorSidebar({ active, user, setActive }: AppSidebarProps) {

  // convert navItems to NavMain format
  const navMainItems = navItems.map((item) => ({
    title: item.title,
    url: "#", // required by NavMain but we won’t navigate
    icon: item.icon,
    isActive: active === item.id,
    onClick: () => setActive(item.id as Route), // this preserves content switching
  }))

  // console.log("suer: ", user)
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher teams={[{ name: "Home", logo: House, plan: "Doctor" }, { name: "Doctor", logo: BookOpen, plan: "Employee" }]} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMainItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={{ name: user?.given_name, email: user?.email, avatar: user?.image }} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
