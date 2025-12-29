'use client'

import { useEffect, useState } from "react"
import NotesContent from "./NotesContent"
import DepartmentsContent, { AdminDoctorInfoType, DepartmentProps } from "./AdminDepartmentsContent"
import NotificationsContent from "./NotificationsContent"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/AdminSidebar"
import AdminDashboardContent, { AdminDashboardType } from "./AdminDashboardContent"
import AdminDoctorsContent, { AdminDoctor, AdminDoctorProps } from "./AdminDoctorsContent"
import { getDepartments } from "./departments"
import AdminPatientsInfo, { AdminPatientType } from "./AdminPatientsInfo"
import AdminInfoContent, { AdminInfoType } from "./AdminInfoContent"
import AdminAppointments, { AdminAppointmentType } from "./AdminAppointments"

export type Route =
  | "dashboard"
  | "departments"
  | "doctors"
  | "patients"
  | "admin-info"
  | "appointments"
  | "notifications"

export default function PageWrapper({ kindeUser, departmentNames }: { kindeUser: any, departmentNames: string[] }) {
  const [active, setActive] = useState<Route>("dashboard")

  // Dashboard state
  const [dashboard, setDashboard] = useState<AdminDashboardType>()
  const [dashboardLoading, setDashboardLoading] = useState(false)

  // admin info state
  // const [adminInfo, setAdminInfo] = useState<AdminDoctorInfoType>()
  // const [adminInfoLoading, setAdminInfoLoading] = useState(false)
  
  const [departments, setDepartments] = useState<DepartmentProps[]>()
  const [departmentsLoading, setDepartmentsLoading] = useState(false)

  // doctor info state
  const [doctors, setDoctors] = useState<AdminDoctor[]>([])
  const [adminDoctorsDepartments, setAdminDoctorsDepartments] = useState<string[]>([])
  const [doctorsFetched, setDoctorsFetched] = useState(false)
  const [doctorsLoading, setDoctorsLoading] = useState(false)

  // State for patients
  const [patients, setPatients] = useState<AdminPatientType[]>([]);
  const [patientsFetched, setPatientsFetched] = useState(false);
  const [patientsLoading, setPatientsLoading] = useState(false);

  
  // Admin Info state
  const [adminInfo, setAdminInfo] = useState<AdminInfoType>()
  const [adminInfoLoading, setAdminInfoLoading] = useState(false)

  // State for appointments
  const [appointments, setAppointments] = useState<AdminAppointmentType[]>([])
  const [appointmentsLoading, setAppointmentsLoading] = useState(false)
  const [appointmentsFetched, setAppointmentsFetched] = useState(false)


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

  // Fetch docotor info
  useEffect(() => {
    if (active !== 'doctors' || doctorsFetched) return;

    const loadDoctors = async () => {
      setDoctorsLoading(true);
      try {
        const res = await fetch(`/api/admin/dashboard/${kindeUser.id}/doctorsInfoContent`);
        const data = await res.json();
        console.log(data.doctorsInfo);
        setDoctors(data.doctorsInfo);
        setDoctorsFetched(true); // mark as fetched
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setDoctorsLoading(false);
      }
    };

    loadDoctors();
  }, [active, doctorsFetched, kindeUser.id]);

  // Fetch patient info only when patients tab is active
  useEffect(() => {
    if (active !== 'patients' || patientsFetched) return;

    const loadPatients = async () => {
      setPatientsLoading(true);
      try {
        const res = await fetch(`/api/admin/dashboard/${kindeUser.id}/adminPatientInfo`);
        const data = await res.json();
        console.log("Patients Data: ", data.patientsInfo);
        setPatients(data.patientsInfo); // assuming you have a useState: const [patients, setPatients] = useState<PatientType[]>([])
        setPatientsFetched(true); // mark as fetched
      } catch (err: any) {
        console.error("Error fetching patients:", err.message);
      } finally {
        setPatientsLoading(false);
      }
    };

    loadPatients();
  }, [active, patientsFetched, kindeUser.id]);


    // Fetch admin info only when admin-info tab is active
    useEffect(() => {
      if (active !== "admin-info" || adminInfo) return

      const loadAdminInfo = async () => {
        setAdminInfoLoading(true)
        try {
          const res = await fetch(`/api/admin/dashboard/${kindeUser.id}/adminInfoContent`)
          const data = await res.json()
          if (data.success) setAdminInfo(data.admin)
          else console.error("Admin fetch error:", data.error)
        } catch (error: any) {
          console.error("Frontend Error: ", error.message)
        } finally {
          setAdminInfoLoading(false)
        }
      }

      loadAdminInfo()
    }, [active, adminInfo, kindeUser.id])

// Fetch appointments only when appointments tab is active
  useEffect(() => {
    if (active !== "appointments" || appointmentsFetched) return;

    const loadAppointments = async () => {
      setAppointmentsLoading(true)
      try {
        const res = await fetch(`/api/admin/dashboard/${kindeUser.id}/adminAppointments`)
        const data = await res.json()
        if (data.success) {
          setAppointments(data.appointments)
        } else {
          console.error("Failed to fetch appointments: ", data.error)
        }
        setAppointmentsFetched(true)
      } catch (err: any) {
        console.error("Frontend error: ", err.message)
      } finally {
        setAppointmentsLoading(false)
      }
    }

    loadAppointments()
  }, [active, appointmentsFetched])


  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return <AdminDashboardContent dashboard={dashboard} onNavigate={setActive} />
      case "departments":
        return <DepartmentsContent departments={departments} />
      case "doctors":
        return <AdminDoctorsContent doctors={doctors} departments={departmentNames} kindeUser={kindeUser}/>
      
      case "admin-info":
        return <AdminInfoContent admin={adminInfo} />
      case "appointments":
        return <AdminAppointments appointments={appointments} />
      case "patients":
        return <AdminPatientsInfo patients={patients} />
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
