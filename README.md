# 🏥 Hospital Management System (HMS)

<p align="center">
  <img src="public/hero/hospital.png" alt="Hospital Management System Banner" height='350' width="100%" />
</p>

## JABED HOSPITAL

A modern, role-based **Hospital Management System** built using **Next.js (App Router)**, **TypeScript**, **Prisma**, and **Tailwind CSS**.  
This project focuses on clean UI, structured backend logic, and scalable architecture — ideal for managing hospital operations digitally.

🔗 **Live Demo:** *(Coming soon)*

---

## 🚀 Tech Stack

- **Next.js** – Full-stack React framework
- **TypeScript** – Type-safe development
- **Prisma ORM** – Database modeling & queries
- **PostgreSQL** – Relational database
- **Tailwind CSS** – Utility-first styling
- **shadcn/ui** – Reusable UI components
- **pnpm** – Fast package manager

---

## ✨ Features

- Role-based authentication (Admin / Doctor / Patient)
- Admin dashboard with system statistics
- Doctor dashboard with appointment access
- Patient registration & appointment booking
- Department & doctor management
- Clean and modern UI
- Scalable folder structure
- Secure API routes
- Full-stack (frontend + backend)

---

## 📁 Folder Structure

```text
hms/
│
├── app/
│ ├── admin/
│ │ ├── login/
│ │ └── dashboard/[id]/
│ │
│ ├── doctor/
│ │ ├── login/
│ │ └── dashboard/[id]/
│ │
│ ├── patient/
│ │ ├── registerPatient/
│ │ ├── appointments/
│ │ └── dashboard/
│ │
│ ├── api/
│ │ ├── admin/
│ │ ├── doctor/
│ │ ├── patient/
│ │ └── auth/
│ │
│ ├── layout.tsx
│ ├── page.tsx
│ └── globals.css
│
├── components/
│ ├── ui/
│ ├── AdminSidebar.tsx
│ ├── DoctorSidebar.tsx
│ ├── SpinnerCustom.tsx
│ └── Header.tsx
│
├── sections/
│ ├── Hero.tsx
│ ├── About.tsx
│ ├── Contact.tsx
│ ├── Footer.tsx
│ └── Header.tsx
│
├── prisma/
│ ├── schema.prisma
│ └── prisma.config.ts
│
├── seed/
│ ├── adminSeed.ts
│ └── doctorSeed.ts
│
├── public/
│ └── assets/
│
├── lib/
│ └── generated/prisma
│
├── constants/
├── hooks/
├── .env
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
└── README.md

```

## 🧠 Architecture Overview

- App Router handles routing and layouts
- Admin, Doctor, and Patient modules are role-isolated
- API routes live inside `/app/api`
- Prisma manages database schema and queries
- Reusable UI components via **shadcn/ui**
- Clean separation of frontend and backend logic

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL
- pnpm (`npm install -g pnpm`)

### Installation

```bash
pnpm install
pnpm dev

``` 
Open http://localhost:3000 in your browser.

```bash
Production Build
pnpm build
pnpm start

```

## 📦 Scripts

- `pnpm dev` – Start development server
- `pnpm build` – Build for production
- `pnpm start` – Run production server
- `pnpm prisma studio` – Open Prisma Studio
- `pnpm prisma db seed` – Seed database

---

## 🎨 Styling

- Tailwind CSS for utility-first styling
- shadcn/ui for accessible components
- Responsive layouts using Tailwind breakpoints
- Dark-mode friendly UI

---

## 📌 Notes

- Built as a Minimum Viable Product (MVP)
- Designed for real-world hospital workflows
- Easily extendable with analytics and billing
- Clean, scalable full-stack architecture

---

## 👤 Author

Built by **Abubakar**

---

## 📄 License

This project is intended for educational and demonstration purposes.
