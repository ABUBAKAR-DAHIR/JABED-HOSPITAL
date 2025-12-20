'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative">
      <div className="container mx-auto flex min-h-screen items-center px-6 md:px-15">
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="space-y-6"
          >
            <motion.p
              variants={fadeUp}
              className="inline-block rounded-full bg-muted px-4 py-1 text-xs font-semibold tracking-widest uppercase text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-emerald-700"
            >
              NABH Accredited Hospital
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl"
            >
              Expert Care.
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-lime-600">
                Personalized for You.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-lg text-lg text-muted-foreground leading-relaxed"
            >
              Providing world-class healthcare with a human touch.
              Our experienced medical professionals deliver advanced treatments,
              compassionate support, and personalized care — anytime you need it.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <Link
                href={'/patient/appointments'}
                // size="lg"
                className="rounded-xl cursor-pointer bg-linear-to-r from-emerald-600 to-lime-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-500 ease-in-out hover:from-lime-500 hover:to-emerald-600"
              >
                Book an Appointment
              </Link>

              <p className="text-sm text-muted-foreground">
                Trusted by thousands of patients
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="absolute -inset-6 rounded-full bg-linear-to-r from-emerald-400/20 to-lime-400/20 blur-3xl" />

            <Image
              src="/hero/hospital.png"
              alt="Jabed Hospital"
              width={480}
              height={480}
              className="relative z-10 object-contain"
              priority
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

/* 🔽 Shared animation variant */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}
