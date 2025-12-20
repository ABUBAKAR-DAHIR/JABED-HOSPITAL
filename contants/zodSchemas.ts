import {z} from 'zod'

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  gender: z.enum(["Male", "Female"], "Select a gender"),
  email: z.email("Invalid email"),
  phone: z.string().min(7, "Phone is required")
})

export const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal Code is required"),
  country: z.string().min(1, "Country is required")
})

export const medicalInfoSchema = z.object({
  allergies: z.string().optional(),
  medications: z.string().optional(),
  surgeries: z.string().optional(),
  chronicConditions: z.string().optional(),
  notes: z.string().optional()
})
