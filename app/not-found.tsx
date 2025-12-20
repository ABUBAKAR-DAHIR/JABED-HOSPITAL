"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import Header from "@/Sections/Header";

export default function NotFound() {
  return (
    <>
        <Header />
        <div className="min-h-screen flex items-center justify-center px-6 ">
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-lg w-full text-center"
        >
            {/* Big 404 */}
            <h1 className="text-[6rem] md:text-[7rem] font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-green-500">
            404
            </h1>

            {/* Title */}
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">
            Page not found
            </h2>

            {/* Description */}
            <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
            The page you’re looking for doesn’t exist, was moved, or is temporarily
            unavailable. Double-check the URL or go back to safety.
            </p>

            {/* Actions */}
            <div className="mt-8 flex items-center justify-center gap-4">
            <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium
                bg-slate-900 text-white hover:bg-slate-800
                dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200
                transition"
            >
                <Home className="w-4 h-4" />
                Go home
            </Link>

            <button
                onClick={() => history.back()}
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium
                border border-slate-300 text-slate-700 hover:bg-slate-100
                dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800
                transition cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4" />
                Go back
            </button>
            </div>

            {/* Footer hint */}
            <p className="mt-10 text-xs text-slate-400 dark:text-slate-500">
            If you believe this is a mistake, please contact support.
            </p>
        </motion.div>
        </div>
    </>
  );
}
