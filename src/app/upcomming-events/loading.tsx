export default function UpcomingEventsLoading() {
  return (
    <section className="min-h-[65vh] bg-[#F7F6F0] px-[5%] py-14 text-[#142C45] transition-colors duration-300 sm:py-20 lg:py-24 dark:bg-[#111b27]">
      <div className="mx-auto max-w-7xl animate-pulse">
        {/* Hero Section Skeleton */}
        <div className="relative mb-9 overflow-hidden rounded-[1.75rem] border border-gray-200 bg-[#142C45] p-6 shadow-xl sm:mb-12 sm:p-9 md:p-12 dark:border-white/10 dark:bg-[#172738]">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <div className="h-6 w-36 rounded-full bg-white/15" />
              <div className="space-y-2">
                <div className="h-9 w-72 rounded-lg bg-white/20 sm:h-12 sm:w-96" />
                <div className="h-9 w-60 rounded-lg bg-white/20 sm:h-12 sm:w-80" />
              </div>
              <div className="h-4 w-full max-w-md rounded bg-white/10" />
            </div>

            <div className="flex shrink-0 gap-3">
              <div className="h-16 w-28 rounded-2xl border border-white/15 bg-white/10" />
              <div className="h-16 w-28 rounded-2xl border border-white/15 bg-white/10" />
            </div>
          </div>
        </div>

        {/* Explore Header Skeleton */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-7 w-48 rounded-lg bg-gray-300 dark:bg-white/15" />
            <div className="h-4 w-64 rounded bg-gray-200 dark:bg-white/10" />
          </div>
          <div className="h-4 w-20 rounded bg-gray-200 dark:bg-white/10" />
        </div>

        {/* Category Pills Skeleton */}
        <div className="mb-8 flex flex-wrap gap-2">
          {["w-14", "w-28", "w-24", "w-32", "w-28", "w-36"].map((width, i) => (
            <div
              key={i}
              className={`h-8 ${width} rounded-full bg-gray-200 dark:bg-white/10`}
            />
          ))}
        </div>

        {/* Event Cards Grid Skeleton */}
        <div className="grid items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <article
              key={i}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#192736]"
            >
              {/* Image Skeleton */}
              <div className="h-44 w-full rounded-xl bg-gray-200 dark:bg-white/10" />

              {/* Title & Category Skeleton */}
              <div className="mt-4 space-y-2">
                <div className="h-5 w-3/4 rounded-md bg-gray-300 dark:bg-white/15" />
                <div className="h-3.5 w-full rounded bg-gray-200 dark:bg-white/10" />
                <div className="h-3.5 w-4/5 rounded bg-gray-200 dark:bg-white/10" />
              </div>

              {/* Metadata Skeleton */}
              <div className="mt-5 space-y-2 border-t border-gray-100 pt-3 dark:border-white/5">
                <div className="h-3.5 w-1/2 rounded bg-gray-200 dark:bg-white/10" />
                <div className="h-3.5 w-2/3 rounded bg-gray-200 dark:bg-white/10" />
              </div>

              {/* Action Button Skeleton */}
              <div className="mt-auto pt-4">
                <div className="h-10 w-full rounded-full bg-gray-200 dark:bg-white/10" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

