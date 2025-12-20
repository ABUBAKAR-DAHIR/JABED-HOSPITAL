// app/cant-access/page.tsx
import React from "react";
import { FileExclamationPoint } from "lucide-react";
import { HeroHeader } from "@/components/header";

const menuItems = [
    { name: "Home", to: "/" },
    { name: "Appointment", href: "/patient/appointments" }
  ];

export default function CantAccess() {
  return (
    <div className="min-h-screen flex flex-col ">
      <HeroHeader menu={menuItems} />
      <main className="flex-1 flex flex-col justify-center items-center px-4">
        <div className="dark:bg-gray-800 bg-white shadow-xl dark:shadow-accent rounded-3xl p-10 max-w-lg w-full text-center">
          <FileExclamationPoint className="mx-auto h-16 w-16 max-md:h-10 max-md:w-10 text-red-500 mb-6 animate-bounce" />
          <h1 className="text-4xl max-md:text-2xl font-extrabold text-gray-800 dark:text-gray-200 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600  dark:text-gray-400 mb-8 max-md:text-base">
            You do not have access to this page at the moment. <br />
            Please Login as a Doctor.
          </p>
          <a
            href="/doctor/login"
            className="inline-block bg-blue-900 hover:bg-purple-800 text-white font-semibold px-8 py-3 max-md:px-6  max-md:text-sm rounded-xl shadow-md transition transform hover:-translate-y-1 "
          >
            Go to Login Page
          </a>
        </div>
      </main>
    </div>
  );
}
