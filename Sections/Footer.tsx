'use client'

import Link from "next/link"
import { motion, useInView, Variants } from "framer-motion"
import { useRef } from "react"

export default function Footer() {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={footerContainer}
      className="border-t"
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <motion.div
          variants={gridContainer}
          className="grid grid-cols-1 gap-12 md:grid-cols-4"
        >

          {/* Brand */}
          <motion.div variants={fadeUp} className="space-y-4">
            <h3 className="text-lg font-semibold">Jabed Hospital</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Delivering compassionate, world-class healthcare through
              innovation, integrity, and a patient-first approach.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#about" className="hover:text-foreground">About Us</Link></li>
              <li><Link href="#services" className="hover:text-foreground">Services</Link></li>
              <li><Link href="/doctor/login" className="hover:text-foreground">Login as a Doctor</Link></li>
              <li><Link href="/admin/login" className="hover:text-foreground">Login as an Admin</Link></li>
              <li><Link href="/patient/dashboard" className="hover:text-foreground">Patient Dashboard</Link></li>
              <li><Link href="#contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeUp}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>24/7 Emergency Care</li>
              <li>Outpatient Services</li>
              <li>Diagnostics & Imaging</li>
              <li>Telemedicine</li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>📍 Gujarat, India</li>
              <li>📞 +91 77538 34571</li>
              <li>✉️ hussainmusalmanaltaf@gmail.com</li>
            </ul>
          </motion.div>

        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeIn}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row"
        >
          <p>© {new Date().getFullYear()} Jabed Hospital. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

/* 🔽 Animation Variants (Typed & Safe) */

const footerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const gridContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // easeOut
    },
  },
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.2,
    },
  },
}
