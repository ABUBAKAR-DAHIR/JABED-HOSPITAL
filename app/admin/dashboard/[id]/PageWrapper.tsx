'use client'

import { useEffect, useState } from "react"
import NotesContent from "./NotesContent"
import DepartmentsContent, { AdminDoctorInfoType, DepartmentProps } from "./AdminDepartmentsContent"
import NotificationsContent from "./NotificationsContent"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/AdminSidebar"
import AdminDashboardContent, { AdminDashboardType } from "./AdminDashboardContent"

export type Route =
  | "dashboard"
  | "departments"
  | "doctors"
  | "patients"
  | "admin-info"
  | "appointments"
  | "notifications"

export default function PageWrapper({ kindeUser }: { kindeUser: any }) {
  const [active, setActive] = useState<Route>("dashboard")

  // Dashboard state
  const [dashboard, setDashboard] = useState<AdminDashboardType>()
  const [dashboardLoading, setDashboardLoading] = useState(false)

  // admin info state
  const [adminInfo, setAdminInfo] = useState<AdminDoctorInfoType>()
  const [adminInfoLoading, setAdminInfoLoading] = useState(false)
  
  const [departments, setDepartments] = useState<DepartmentProps[]>()
  const [departmentsLoading, setDepartmentsLoading] = useState(false)

  // Fetch dashboard only when dashboard tab is active
  useEffect(() => {
    if (active !== "dashboard" || dashboard) return

    const loadDashboard = async () => {
      setDashboardLoading(true)
      try {
        const res = await fetch(`/api/admin/dashboard/${kindeUser.id}/adminDashboardContent`)
        console.log("Before ", res)
        const data = await res.json()
        console.log("After ", res)
        console.log(data)
        setDashboard(data.adminInfo)
      } catch (error: any) {
        console.error("Frontend error: ", error.message)
      } finally {
        setDashboardLoading(false)
      }
    }

    loadDashboard()
  }, [active, dashboard])


  // Fetch admin info only when admin-info tab is active
  useEffect(() => {
    if (active !== "departments" || departments) return

    const loadDeptInfo = async () => {
      setDepartmentsLoading(true)
      // console.log(kindeUser.id)
      try {
        const res = await fetch(`/api/admin/dashboard/${kindeUser.id}/adminDepartmentInfo`)
        const data = await res.json()
        console.log("Data ", data)
        setDepartments(data.departmentInfo)
      } catch (error: any) {
        console.error("Frontend Error: ", error.message)
      } finally {
        setDepartmentsLoading(false)
      }
    }

    loadDeptInfo()
  }, [active, departments])

  // // Fetch admin info only when admin-info tab is active
  // useEffect(() => {
  //   if (active !== "admin-info" || adminInfo) return

  //   const loadAdminInfo = async () => {
  //     setAdminInfoLoading(true)
  //     // console.log(kindeUser.id)
  //     try {
  //       const res = await fetch(`/api/admin/dashboard/${kindeUser.id}/adminDepartmentInfoContent`)
  //       const data = await res.json()
  //       console.log(data)
  //       setAdminInfo(data.adminInfo)
  //     } catch (error: any) {
  //       console.error("Frontend Error: ", error.message)
  //     } finally {
  //       setAdminInfoLoading(false)
  //     }
  //   }

  //   loadAdminInfo()
  // }, [active, adminInfo])

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return <AdminDashboardContent dashboard={dashboard} onNavigate={setActive} />
      case "departments":
        return <DepartmentsContent departments={departments} />
      case "admin-info":
        // return <adminInfoContent adminInfo={adminInfo} />
      case "appointments":
        // return <AppointmentsContent />
      case "notifications":
        return <NotificationsContent />
      default:
        return null
    }
  }

  return (
    <SidebarProvider>
      <AdminSidebar active={active} setActive={setActive} user={kindeUser} />
      <SidebarInset>
        <div className="p-4">
          <SidebarTrigger />
        </div>
        {renderContent()}
      </SidebarInset>
    </SidebarProvider>
  )
}
