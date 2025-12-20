import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="py-20 min-h-screen pt-30">
      <div className="mx-auto w-[80%] md:w-[60%]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 space-y-8">
          {/* Progress bar */}
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex-1 space-y-2">
                <Skeleton className="h-1.5 w-full rounded" />
                <Skeleton className="h-3 w-24 rounded" />
              </div>
            ))}
          </div>

          {/* Section title */}
          <Skeleton className="h-6 w-64" />

          {/* Inputs */}
          <div className="space-y-4">
            <div className="flex gap-2 max-md:flex-col">
              <Skeleton className="h-12 flex-1 rounded-lg" />
              <Skeleton className="h-12 flex-1 rounded-lg" />
              <Skeleton className="h-12 flex-1 rounded-lg" />
            </div>

            <Skeleton className="h-12 w-full rounded-lg" />

            <div className="flex gap-6">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>

            <Skeleton className="h-12 w-1/3 max-md:w-full rounded-lg" />
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            <Skeleton className="h-10 w-24 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
