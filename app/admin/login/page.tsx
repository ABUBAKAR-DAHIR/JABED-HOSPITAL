'use client'

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { SpinnerCustom } from "@/components/SpinnerCustom"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState("")

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (data.success) {
        router.push(`/admin/dashboard/${data.id}`)
      } else {
        setInfo(data.error)
      }
    } catch (err: any) {
      console.error(err.message)
      setInfo("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="h-screen w-full dark:bg-neutral-950 flex items-center justify-center">
      {/* MAIN CONTAINER */}
      <div className="w-full max-w-6xl h-[70%] grid grid-cols-1 lg:grid-cols-[1fr_1fr] rounded-2xl overflow-hidden shadow-2xl">

        {/* LEFT — LOGIN */}
        <div className="bg-neutral-950 flex items-center justify-center max-md:px-10">
          <Card className="h-full w-full bg-neutral-900 border border-neutral-800 shadow-none rounded-none flex flex-col justify-center md:px-12">
            <CardHeader className="space-y-2 pb-6">
              <CardTitle className="text-3xl font-semibold text-white">
                Admin Login
              </CardTitle>
              <p className="text-sm text-neutral-400">
                Enter your credentials to continue
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* USERNAME */}
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wide text-neutral-400">
                    Username
                  </label>
                  <Input
                    type="text"
                    placeholder="admin@hospital.com text-white"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mt-2 h-11 bg-neutral-950 border-neutral-800 focus:border-green-500 focus:ring-green-500 max-md:w-full"
                  />
                </div>

                {/* PASSWORD */}
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wide text-neutral-400">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-2 h-11 bg-neutral-950 border-neutral-800 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                {/* ERROR MESSAGE */}
                {info && (
                  <p className="text-sm text-red-500 text-center">
                    {info}
                  </p>
                )}

                {/* SUBMIT */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full h-11 bg-green-600 hover:bg-green-500 text-white font-medium"
                >
                  {loading ? <SpinnerCustom /> : "Sign in"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT — BRAND */}
        <div className="hidden lg:flex flex-col justify-center px-16 bg-gradient-to-br from-green-700 via-emerald-600 to-green-500 text-white">
          <h1 className="text-4xl font-bold leading-tight">
            Hospital <br /> Admin Panel
          </h1>

          <p className="mt-4 text-lg text-green-100 max-w-md">
            Securely manage doctors, departments, patients, and appointments
            from a single dashboard.
          </p>

          <div className="mt-10 text-sm text-green-200">
            © {new Date().getFullYear()} HMS Platform
          </div>
        </div>

      </div>
    </section>
  )
}
