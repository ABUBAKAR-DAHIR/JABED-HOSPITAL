'use client'
import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { DatePicker } from '@/components/DatePicker'
import { useRouter } from 'next/navigation'
import { SpinnerCustom } from '@/components/SpinnerCustom'
import { Button } from '@/components/ui/button'

export default function BookingPage({id} : {id: string}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState('')
  const [reason, setReason] = useState('')

  
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!date || !time) {
      alert("Please enter both date and time")
      return
    }

    // Parse the date string returned by DatePicker
    const parsedDate = new Date(date)
    if (isNaN(parsedDate.getTime())) {
      setLoading(false)
      alert("Invalid date format")
      return
    }

    // Parse time "HH:MM"
    const [hours, minutes] = time.split(':').map(Number)

    // Set hours and minutes
    parsedDate.setHours(hours)
    parsedDate.setMinutes(minutes)
    parsedDate.setSeconds(0)
    parsedDate.setMilliseconds(0)

    // Assign ultimateDate
    const finalDate = parsedDate.toISOString()

    console.log({
      name,
      phoneNumber,
      finalDate,
      time,
      reason,
    })

    const appointmentInfo = {
      name,
      phoneNumber,
      finalDate,
      time,
      reason,
    }

    const getRes = await fetch(`/api/patient/appointments`,
      {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(appointmentInfo) 
      }
    )

    const res = await getRes.json()
    if(res.success) {
      setLoading(false)
      router.push(`/patient/dashboard`) 
    }
    else{
      setLoading(false)
      console.error("Frontend error: ", res.error)
    }
      
  }


  return (
    <section ref={ref} className="pt-40 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-[40px] font-extrabold text-gray-900 dark:text-white">
            Book an Appointment
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Schedule a visit with our expert doctors. Fill out the form below and our team will contact you shortly.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          className="rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              placeholder="Your name"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={phoneNumber}
              onChange={(e: any) => setPhoneNumber(e.target.value)}
            />

            <DatePicker
              className="py-6"
              label="Preferred Date"
              value={date}
              onChange={setDate}
            />

            <Input
              label="Preferred Time"
              type="time"
              value={time}
              onChange={(e: any) => setTime(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Reason for Visit</label>
            <textarea
              required
              rows={4}
              placeholder="Tell us briefly..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:text-white resize-none"
            />
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="cursor-pointer mt-6 w-full py-6 rounded-xl bg-linear-to-r from-green-700 to-green-400 text-white font-semibold hover:from-green-600 hover:to-green-700 transition"
          >
            {loading? <SpinnerCustom /> : 'Book Now'}
          </Button>
        </motion.form>
      </div>
    </section>
  )
}

/* 🔽 Reusable Input Component */
function Input({ label, type = 'text', placeholder, value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="mt-2 w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:text-white"
      />
    </div>
  )
}
