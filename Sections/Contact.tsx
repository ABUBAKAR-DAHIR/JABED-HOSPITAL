'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { SpinnerCustom } from '@/components/SpinnerCustom'
import { toast } from 'sonner'

export default function Contact() {
  const ref = useRef<HTMLDivElement | null>(null)

  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [info, setInfo] = useState<string>('')

  const isInView = useInView(ref, {
    once: true,
    amount: 0.2, // start only when 35% visible
  })

  const handleSubmit = async (e: React.FormEvent)=>{
    e.preventDefault()
    setLoading(true)
    const data = {
        name: name,
        email: email,
        phone: phone,
        message: message
    }
    try {
        const getRes = await fetch('/api/message', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                message: message
            })
        })

        const res = await getRes.json()
        if(res.success){
            setInfo("Message Sent")
            toast.success("Message sent !")
            setName('')
            setEmail('')
            setPhone('')
            setMessage('')
        }
        else setInfo(res.error)
    } catch (error: any) {
        console.error("Frontend error: ", error.message)
        setInfo(error.message)
    }
    console.log("Data ", data)
    setLoading(false)
  }

  useEffect(()=>{
    if(info){
        setTimeout(()=>{
            setInfo('')
        }, 5000)
    }
  })

  return (
    <section
      id="contact"
      ref={ref}
      className="w-full py-20 px-6"
    >
      <div className="max-w-7xl mx-auto border-2 px-4 md:px-16 rounded-2xl py-10">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center mb-20"
        >
          <h2 className="text-[33px] md:text-5xl font-bold mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We’re here to help you every step of the way. Whether you have a question,
            need medical assistance, or want to schedule an appointment — we’re listening.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={container}
            className="space-y-10 max-md:text-center"
          >
            <motion.div variants={fadeUp}>
              <h3 className="text-xl font-semibold mb-2 max-md:text-[17px]">Hospital Address</h3>
              <p className="text-gray-600 dark:text-gray-400 max-md:text-sm">
                Jabed Hospital & Medical Center<br />
                123 Wellness Avenue,<br />
                City, State – 000000
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h3 className="text-xl font-semibold mb-2 max-md:text-[17px]">Call Us</h3>
              <p className="text-gray-600 dark:text-gray-400 max-md:text-sm">+91 98765 43210</p>
              <p className="text-gray-600 dark:text-gray-400 max-md:text-sm">
                Emergency: 24×7 Available
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h3 className="text-xl font-semibold mb-2 max-md:text-[17px]">Email</h3>
              <p className="text-gray-600 dark:text-gray-400 max-md:text-sm">
                support@jabedhospital.com
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h3 className="text-xl font-semibold mb-2 max-md:text-[17px]">Working Hours</h3>
              <p className="text-gray-600 dark:text-gray-400 max-md:text-sm">
                Monday – Saturday: 8:00 AM – 8:00 PM
              </p>
              <p className="text-gray-600 dark:text-gray-400 max-md:text-sm">
                Sunday: Emergency Only
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={slideInRight}
            className="rounded-2xl shadow-lg p-8 border-2 border-green-900"
          >
            <h3 className="text-2xl font-semibold mb-8">
              Send Us a Message
            </h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input label="Full Name" placeholder="Your name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
              <Input label="Email Address" type="email" placeholder="you@example.com" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
              <Input label="Phone Number" type="tel" placeholder="+91 XXXXX XXXXX" value={phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}/>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
                {info && <p className='text-center'>{info}</p>}
              <Button
                disabled={loading}
                type="submit"
                className="cursor-pointer w-full py-6 rounded-xl bg-linear-to-r
                from-green-700 to-green-400 text-white font-semibold
                hover:from-green-600 hover:to-green-700 transition"
              >
                {loading? <SpinnerCustom /> : 'Submit Message'}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeIn}
          className="text-center mt-20 text-gray-500"
        >
          <p className='max-md:text-sm'>
            Your health matters to us. Reach out anytime — we’re always ready to care.
          </p>
        </motion.div>

      </div>
    </section>
  )
}

/* -------------------- Input -------------------- */

function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange
}: {
  label: string
  type?: string
  placeholder?: string
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        required
        value={value}
        onChange = {onChange}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border px-4 py-3
        focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  )
}

/* -------------------- Animations -------------------- */

const easeOut = [0.16, 1, 0.3, 1] as const

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.3,
    },
  },
}

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 48,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.95,
      ease: easeOut,
    },
  },
}

const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.1,
      ease: easeOut,
      delay: 0.35,
    },
  },
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: easeOut,
      delay: 0.6,
    },
  },
}
