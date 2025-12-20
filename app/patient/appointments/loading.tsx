import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="pt-40 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-10 w-72 mx-auto" />
          <Skeleton className="h-4 w-[80%] mx-auto" />
          <Skeleton className="h-4 w-[60%] mx-auto" />
        </div>

        {/* Form Card */}
        <div className="rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 space-y-6">
          {/* Grid inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </div>

          {/* Textarea */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-28 w-full rounded-lg" />
          </div>

          {/* Button */}
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </section>
  );
}
