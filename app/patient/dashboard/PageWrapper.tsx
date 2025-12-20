'use client'

import { useEffect, useState } from "react"
import DashboardContent, { PatientDashboardType } from "./DashboardContent"
import PatientInfoContent, { PatientInfoType } from "./PatientInfoContent"
import NotesContent from "./NotesContent"
import AppointmentsContent from "./AppointmentsContent"
import NotificationsContent from "./NotificationsContent"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export type Route =
  | "dashboard"
  | "patient-info"
  | "appointments"
  | "health-notifications"

export default function PageWrapper({ kindeUser }: { kindeUser: any }) {
  const [active, setActive] = useState<Route>("dashboard")

  // Dashboard state
  const [dashboard, setDashboard] = useState<PatientDashboardType>()
  const [dashboardLoading, setDashboardLoading] = useState(false)

  // Patient info state
  const [patientInfo, setPatientInfo] = useState<PatientInfoType>()
  const [patientInfoLoading, setPatientInfoLoading] = useState(false)

  // Fetch dashboard only when dashboard tab is active
  useEffect(() => {
    if (active !== "dashboard" || dashboard) return

    const loadDashboard = async () => {
      setDashboardLoading(true)
      try {
        const res = await fetch("/api/patient/dashboard/dashboardContent")
        const data = await res.json()
        setDashboard(data.content)
      } catch (err) {
        console.error(err)
      } finally {
        setDashboardLoading(false)
      }
    }

    loadDashboard()
  }, [active, dashboard])

  // Fetch patient info only when patient-info tab is active
  useEffect(() => {
    if (active !== "patient-info" || patientInfo) return

    const loadPatientInfo = async () => {
      setPatientInfoLoading(true)
      try {
        const res = await fetch("/api/patient/dashboard/patientInfoContent")
        const data = await res.json()
        setPatientInfo(data.content)
      } catch (err) {
        console.error(err)
      } finally {
        setPatientInfoLoading(false)
      }
    }

    loadPatientInfo()
  }, [active, patientInfo])

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return <DashboardContent dashboard={dashboard} onNavigate={setActive} />
      case "patient-info":
        return <PatientInfoContent patientInfo={patientInfo} />
      case "appointments":
        return <AppointmentsContent />
      case "health-notifications":
        return <NotificationsContent />
      default:
        return null
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar active={active} setActive={setActive} user={kindeUser} />
      <SidebarInset>
        <div className="p-4">
          <SidebarTrigger />
        </div>
        {renderContent()}
      </SidebarInset>
    </SidebarProvider>
  )
}
