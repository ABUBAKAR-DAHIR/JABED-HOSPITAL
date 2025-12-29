'use client'

import React from "react"
import { Heart, Stethoscope, User } from "lucide-react"
import { motion, useInView, Variants } from "framer-motion"
import { useRef } from "react"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 flex items-center justify-center md:px-40 "
    >
      <div className="container">
        <div className="relative mx-auto grid xl:grid-cols-2 gap-40 items-center max-md:px-6">

          {/* LEFT */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={container}
            className="flex flex-col space-y-6"
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-extrabold max-md:text-center max-md:text-3xl"
            >
              About{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-emerald-600">
                Jabed Hospital
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-gray-700 dark:text-gray-300 text-lg max-md:text-[15px] max-md:text-center"
            >
              At Jabed Hospital, we combine advanced medical technology with compassionate care.
              Our dedicated team ensures every patient receives personalized treatment in a safe,
              welcoming environment.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              <Feature icon={Heart} title="Compassion" />
              <Feature icon={Stethoscope} title="Expertise" />
              <Feature icon={User} title="Community" />
            </motion.div>

            <motion.button
              variants={fadeUp}
              className="mt-6 w-max max-md:w-full px-6 py-3 font-semibold text-white rounded-lg
              bg-linear-to-r from-emerald-400 to-emerald-600 shadow-lg
              hover:from-emerald-500 hover:to-emerald-700 transition-all"
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* DIVIDER */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:block absolute left-1/2 top-0 bottom-0 w-px
            max-xl:left-0 max-xl:right-0 max-xl:top-1/2 max-xl:h-px max-xl:w-full max-xl:my-10
            max-md:left-0 max-md:right-0 max-md:top-1/2 max-md:h-px max-md:w-full
            bg-gray-300 dark:bg-gray-600"
          />

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col justify-center space-y-6 max-md:pt-10"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Our Journey
            </h3>

            <p className="text-gray-700 dark:text-gray-300 text-lg max-md:text-base">
              Founded in 2010, Jabed Hospital began with a small team of dedicated doctors
              and nurses, driven by a vision to provide world-class healthcare to our community.
            </p>

            <blockquote className="border-l-4 border-emerald-400 pl-4 italic text-gray-600 dark:text-gray-400">
              “Our mission has always been simple: compassion and excellence in every patient interaction.”
              <span className="block mt-2 font-semibold text-gray-800 dark:text-white">
                — Dr. Jabed, CEO
              </span>
            </blockquote>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

/* 🔽 Small reusable feature card */
function Feature({ icon: Icon, title }: any) {
  return (
    <div className="flex flex-col items-center text-center">
      <Icon className="text-emerald-500 w-10 h-10 mb-2" />
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-500">
        Excellence and care in every interaction.
      </p>
    </div>
  )
}

/* 🔽 Animation variants */
const container: Variants = {
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
      ease: "easeOut",
    },
  },
}
