'use client'

import { useEffect, useState } from "react"
import NotesContent from "./NotesContent"
import AppointmentsContent from "./AppointmentsContent"
import NotificationsContent from "./NotificationsContent"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DoctorDashboardContent, { DoctorDashboardType } from "./DoctorDashboardContent"
import { DoctorSidebar } from "@/components/DoctorSidebar"
import DoctorInfoContent, { DoctorInfoType } from "./DoctorInfoContent"

export type Route =
  | "dashboard"
  | "doctor-info"
  | "appointments"
  | "notifications"

export default function PageWrapper({ kindeUser }: { kindeUser: any }) {
  const [active, setActive] = useState<Route>("dashboard")

  // Dashboard state
  const [dashboard, setDashboard] = useState<DoctorDashboardType>()
  const [dashboardLoading, setDashboardLoading] = useState(false)

  // doctor info state
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfoType>()
  const [doctorInfoLoading, setDoctorInfoLoading] = useState(false)

  // Fetch dashboard only when dashboard tab is active
  useEffect(() => {
    if (active !== "dashboard" || dashboard) return

    const loadDashboard = async () => {
      setDashboardLoading(true)
      try {
        const res = await fetch(`/api/doctor/dashboard/${kindeUser.id}/doctorDashboardContent`)
        console.log("Before ", res)
        const data = await res.json()
        console.log("After ", res)
        console.log(data)
        setDashboard(data.doctorInfo)
      } catch (error: any) {
        console.error("Frontend error: ", error.message)
      } finally {
        setDashboardLoading(false)
      }
    }

    loadDashboard()
  }, [active, dashboard])

  // Fetch doctor info only when doctor-info tab is active
  useEffect(() => {
    if (active !== "doctor-info" || doctorInfo) return

    const loaddoctorInfo = async () => {
      setDoctorInfoLoading(true)
      // console.log(kindeUser.id)
      try {
        const res = await fetch(`/api/doctor/dashboard/${kindeUser.id}/doctorInfoContent`)
        const data = await res.json()
        console.log(data)
        setDoctorInfo(data.doctorInfo)
      } catch (error: any) {
        console.error("Frontend Error: ", error.message)
      } finally {
        setDoctorInfoLoading(false)
      }
    }

    loaddoctorInfo()
  }, [active, doctorInfo])

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return <DoctorDashboardContent dashboard={dashboard} onNavigate={setActive} />
      case "doctor-info":
        return <DoctorInfoContent doctorInfo={doctorInfo} />
      case "appointments":
        return <AppointmentsContent />
      case "notifications":
        return <NotificationsContent />
      default:
        return null
    }
  }

  return (
    <SidebarProvider>
      <DoctorSidebar active={active} setActive={setActive} user={kindeUser} />
      <SidebarInset>
        <div className="p-4">
          <SidebarTrigger />
        </div>
        {renderContent()}
      </SidebarInset>
    </SidebarProvider>
  )
}
