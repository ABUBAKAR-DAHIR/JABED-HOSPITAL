'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, DollarSign } from "lucide-react"
import { useTheme } from "next-themes"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import Image from "next/image"
import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Route } from "./PageWrapper"

export type AdminDashboardType = {
  adminName: string
  email: string
  gender: string
  imageUrl?: string | null
  stats: {
    doctors: number
    patients: number
    appointments: number
    departments: number
    todayAppointments: number
    tomorrowAppointments: number
    upcomingAppointments: number
  }
}

type Props = {
  dashboard?: AdminDashboardType
  onNavigate?: (route: Route) => void // 👈 Add this line
}

const userGrowthData = [
  { date: "18 Dec", users: 1 },
  { date: "20 Dec", users: 3 },
  { date: "21 Dec", users: 1 },
  { date: "23 Dec", users: 3 },
  { date: "25 Dec", users: 1 },
]

export default function AdminDashboardContent({ dashboard }: Props) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  console.log("Imageee: ", dashboard?.imageUrl)
  if (!dashboard) {
    return (
      <div className="flex flex-col gap-6 p-4 md:p-8">
        {/* Header Skeleton */}
        <Card>
          <CardHeader className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2 text-center mt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-2/5 mx-auto rounded" />
                <Skeleton className="h-6 w mx-auto rounded" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Stat Cards Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
              <Skeleton className="h-8 w-24 mx-auto rounded-md" />
            </Card>
          ))}
        </div>

        {/* Chart Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="p-4 space-y-4">
              <Skeleton className="h-5 w-40 rounded-md" />
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-40 w-full rounded-xl" />
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex items-center gap-4">
            <Image
              src={dashboard.imageUrl || "/avatar-placeholder.jpg"}
              alt="Admin avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <CardTitle className="text-lg">Welcome Back!</CardTitle>
              <p className="text-sm text-muted-foreground">
                {dashboard.adminName}
              </p>
              <Badge className="mt-1 text-xs">{dashboard.gender}</Badge>
            </div>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-2 text-center">
            <Stat label="Doctors" value={dashboard.stats.doctors} />
            <Stat label="Patients" value={dashboard.stats.patients} />
            <Stat label="Appointments" value={dashboard.stats.appointments} />
            <Stat label="Departments" value={dashboard.stats.departments} />
          </CardContent>
        </Card>

        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard title="Appointments" value={dashboard.stats.appointments} icon={<CalendarDays />} />
          <StatCard title="Revenue" value="$0.00" icon={<DollarSign />} />
          <StatCard title="Today’s Earning" value="$0.00" icon={<DollarSign />} />
          <StatCard title="Today’s Appointments" value={dashboard.stats.todayAppointments} icon={<CalendarDays />} />
          <StatCard title="Tomorrow Appointments" value={dashboard.stats.todayAppointments} icon={<CalendarDays />} />
          <StatCard title="Upcoming Appointments" value={dashboard.stats.upcomingAppointments} icon={<CalendarDays />} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>This Month’s Signups</CardTitle>
            <p className="text-sm text-muted-foreground">Total: 9 users</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={userGrowthData}>
                <XAxis dataKey="date" stroke={isDark ? "#ccc" : "#fffd"} />
                <YAxis stroke={isDark ? "#ccc" : "#fffd"} />
                <Tooltip />
                <Bar dataKey="users" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Analytics</CardTitle>
            <p className="text-sm text-muted-foreground">
              100% growth since last month
            </p>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-40">
            <div className="text-center">
              <p className="text-2xl font-bold">+100%</p>
              <p className="text-sm text-muted-foreground">User growth</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-sm">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  )
}

type StatCardProps = {
  title: string
  value: string | number
  icon: React.ReactNode
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card className="text-center">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        <div className="text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}