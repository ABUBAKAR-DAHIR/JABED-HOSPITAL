"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { DatePicker } from "@/components/DatePicker";
import NextButton from "@/components/NextButton";
import CustomInput from "@/components/CustomInput";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { SpinnerCustom } from "@/components/SpinnerCustom";

// === ZOD SCHEMAS ===
const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First Name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last Name is required"),
  phone: z.string().min(7, "Phone is required"),
  gender: z.enum(["male", "female"], "Select a gender"),
  dob: z.string().min(1, "Date of Birth is required"),
});

const addressSchema = z.object({
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address1: z.string().min(1, "Address 1 is required"),
  address2: z.string().optional(),
});

const medicalInfoSchema = z.object({
  allergies: z.string().optional(),
  medications: z.string().optional(),
  surgeries: z.string().optional(),
  chronicConditions: z.string().optional(),
  notes: z.string().optional(),
});

// Combine all steps
const combinedSchema = z.object({
  ...personalInfoSchema.shape,
  ...addressSchema.shape,
  ...medicalInfoSchema.shape,
})

export type FormData = z.infer<typeof combinedSchema>


export default function RegisterPatient() {
  const sections = [
    { id: 0, name: "Personal information" },
    { id: 1, name: "Contact information" },
    { id: 2, name: "Medical information" },
  ];

  const stepFields: Record<number, (keyof FormData)[]> = {
        0: ["firstName", "middleName", "lastName", "phone", "gender", "dob"],
        1: ["state", "city", "address1", "address2"],
        2: ["allergies", "medications", "surgeries", "chronicConditions", "notes"],
    };


  const [step, setStep] = useState<number>(0);

  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof window !== "undefined" ? document.documentElement.classList.contains("dark") : true
  );

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  const nextStep = () => {
    if (step < sections.length - 1) setStep((s) => s + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const segmentWidth = `${95 / sections.length}%`;

  // === REACT HOOK FORM SETUP ===
  const { register, handleSubmit, trigger, control, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(combinedSchema),
    mode: "onChange",
  });

  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    console.log("Final Data:", data);

    try {
      const getRes = await fetch('/api/patient/registerPatient',
        {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data)
        }
      )

      const res = await getRes.json()

      if(res.success){
        setLoading(false)
        router.push('/patient/appointments')
      }
      else{
        setLoading(false)
        console.error("Frontend error: ", res.error)
      }
    } catch (error: any) {
      setLoading(false)
      console.error("Frontend error: ", error.message)
    }

    // Submit to backend or next page
  };

  errors && console.log(errors)

  // === RENDER ===
  return (
    <section className="py-20 min-h-screen pt-30">
      <div className="mx-auto w-[80%] md:w-[60%]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            Patient Information
          </h1>

          <div className="flex items-center gap-3 max-md:gap-px">
            <button
              aria-label="Toggle theme"
              onClick={() => setIsDark((v) => !v)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            <div className="text-sm text-slate-500 dark:text-slate-300">
              Step {step + 1} / {sections.length}
            </div>
          </div>
        </div>

        <motion.div
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className=" max-md:px-4 max-md:py-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 md:p-6"
        >
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-end gap-3 w-full">
              {sections.map((s) => {
                const filled = step > s.id;
                const active = step === s.id;
                return (
                  <div key={s.id} style={{ width: segmentWidth }} className="shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <motion.div
                          layout
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: filled || active ? 1 : 0 }}
                          transition={{ duration: 0.45 }}
                          className={`origin-left h-1.25 max-md:h-1 rounded ${filled || active ? "bg-linear-to-r from-green-500 to-cyan-500" : "bg-emerald-500"}`}
                        />
                      </div>
                      <div
                        className={`ml-2 w-8 h-8 max-md:w-4 max-md:h-4 max-md:hidden max-md:text-[10px] rounded-full flex items-center justify-center text-xs font-medium ${
                          active ? "bg-green-600 text-white" : "bg-slate-500 text-white"
                        }`}
                        title={`Step ${s.id + 1}`}
                      >
                        {s.id + 1}
                      </div>
                    </div>

                    <p className={`mt-3 text-xs font-semibold ${active ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"}`}>
                      {s.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Animated content area */}
          <div className="mt-2">
            <AnimatePresence mode="wait">
              <motion.form
                key={step}
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.32 }}
                className="space-y-4 w-full mx-auto"
              >
                <h2 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-100">
                  Provide your {sections[step].name}
                </h2>

                {/* STEP 0 - Personal Info */}
                {step === 0 && (
                  <div className="space-y-4">
                    <div className="flex gap-2 max-md:flex-col">
                      <div className="flex-1">
                        <CustomInput {...register("firstName")} type="text" placeholder="First Name" />
                        {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
                      </div>
                      <div className="flex-1">
                        <CustomInput {...register("middleName")} type="text" placeholder="Middle Name" />
                        {errors.middleName && <p className="text-red-500 text-xs">{errors.middleName.message}</p>}
                      </div>
                      <div className="flex-1">
                        <CustomInput {...register("lastName")} type="text" placeholder="Last Name" />
                        {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
                      </div>
                    </div>

                    <div>
                      <CustomInput {...register("phone")} type="tel" placeholder="Phone Number" />
                      {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                    </div>

                    <div className="flex gap-6 items-center">
                      <label className="flex items-center gap-2">
                        <input type="radio" {...register("gender")} value="male" />
                        Male
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" {...register("gender")} value="female" />
                        Female
                      </label>
                    </div>
                    {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}

                    <div className="pt-2 w-1/3 max-md:w-full">
                      <Controller
                        control={control}
                        name="dob"
                        render={({ field }) => <DatePicker {...field} />}
                      />
                      {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
                    </div>
                  </div>
                )}

                {/* STEP 1 - Contact Info */}
                {step === 1 && (
                  <div className="space-y-3">
                    <CustomInput {...register("state")} type="text" placeholder="State" />
                    {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}

                    <CustomInput {...register("city")} type="text" placeholder="City" />
                    {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}

                    <CustomInput {...register("address1")} type="text" placeholder="Address 1" />
                    {errors.address1 && <p className="text-red-500 text-xs">{errors.address1.message}</p>}

                    <CustomInput {...register("address2")} type="text" placeholder="Address 2" />
                    {errors.address2 && <p className="text-red-500 text-xs">{errors.address2.message}</p>}
                  </div>
                )}

                {/* STEP 2 - Medical Info */}
                {step === 2 && (
                  <div className="space-y-3">
                    <CustomInput {...register("allergies")} type="text" placeholder="Known Allergies" />
                    {errors.allergies && <p className="text-red-500 text-xs">{errors.allergies.message}</p>}

                    <CustomInput {...register("medications")} type="text" placeholder="Current medications" />
                    {errors.medications && <p className="text-red-500 text-xs">{errors.medications.message}</p>}

                    <CustomInput {...register("surgeries")} type="text" placeholder="Past surgeries" />
                    {errors.surgeries && <p className="text-red-500 text-xs">{errors.surgeries.message}</p>}

                    <CustomInput {...register("chronicConditions")} type="text" placeholder="Chronic conditions" />
                    {errors.chronicConditions && <p className="text-red-500 text-xs">{errors.chronicConditions.message}</p>}

                    <textarea
                      {...register("notes")}
                      rows={4}
                      placeholder="Other notes..."
                      className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-gray-600 dark:text-white resize-none"
                    />
                    {errors.notes && <p className="text-red-500 text-xs">{errors.notes.message}</p>}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-6 w-full md:w-3/4 mx-auto">
                  <NextButton onClick={prevStep} icon={<ChevronLeft />} disabled={step === 0} />
                  {step !== sections.length - 1 ? (
                    <NextButton
                        icon={<ChevronRight />}
                        onClick={async () => {
                            const valid = await trigger(stepFields[step]);
                            if (valid) nextStep();
                        }}
                    />

                    // <NextButton onClick={handleSubmit(nextStep)} icon={<ChevronRight />} />
                  ) : (
                    <button disabled={loading} type="submit" className={`${buttonVariants({ variant: "default" })} cursor-pointer py-3 px-4`}>
                      {loading? <SpinnerCustom /> : 'Submit'}
                    </button>
                  )}
                </div>
              </motion.form>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
