'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export type PatientInfoType = {
  name: string
  gender: string
  state: string
  phoneNumber: string
  dob?: string | Date
}

export default function PatientInfoContent({ patientInfo }: { patientInfo?: PatientInfoType }) {
  const loading = !patientInfo

  const infoItems = patientInfo
    ? [
        { label: "Full Name", value: patientInfo.name },
        { label: "Gender", value: patientInfo.gender },
        { label: "State", value: patientInfo.state },
        { label: "Phone Number", value: patientInfo.phoneNumber },
        patientInfo.dob ? { label: "Date of Birth",  value: new Date(patientInfo.dob).toISOString().split("T")[0]} : null,
      ].filter(Boolean)
    : []

  return (
    <div className="p-4 flex justify-center">
      {loading ? (
        <Card className="w-full max-w-3xl border border-gray-200 dark:border-gray-700 shadow animate-pulse">
          <CardHeader>
            <Skeleton className="h-8 w-full md:w-1/2 rounded-xl" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between gap-2">
                <Skeleton className="h-6 w-1/3 rounded-xl" />
                <Skeleton className="h-6 w-1/2 rounded-xl" />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-3xl border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl">
          <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
            <CardTitle className="font-semibold text-2xl md:text-3xl">
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 py-6">
            {infoItems.map(info => (
              <div
                key={info?.label}
                className="flex justify-between items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <p className="text-base font-medium text-gray-700 dark:text-gray-300">{info?.label}</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">{info?.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
