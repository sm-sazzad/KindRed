export default function EventDetailsLoading() {
  return (
    <div className="min-h-[65vh] bg-[#F7F6F0] px-[5%] py-10 text-[#142C45] transition-colors duration-300 sm:py-14 lg:py-20 dark:bg-[#111b27]">
      <div className="mx-auto max-w-7xl animate-pulse">
        {/* Back Link Skeleton */}
        <div className="mb-6 h-5 w-24 rounded bg-gray-200 sm:mb-8 dark:bg-white/10" />

        {/* Main Article Skeleton */}
        <article className="grid overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white shadow-xl lg:grid-cols-[1.15fr_0.85fr] dark:border-white/10 dark:bg-[#192736]">
          {/* Image Placeholder Skeleton */}
          <div className="relative min-h-[300px] bg-gray-300 sm:min-h-[440px] lg:min-h-[620px] dark:bg-white/10">
            <div className="absolute top-5 left-5 h-7 w-28 rounded-full bg-black/20 dark:bg-white/15" />
            <div className="absolute top-5 right-5 h-7 w-24 rounded-full bg-black/20 dark:bg-white/15" />
            <div className="absolute right-5 bottom-5 left-5 h-10 w-48 rounded-xl bg-black/20 dark:bg-white/15" />
          </div>

          {/* Event Content Skeleton */}
          <div className="flex flex-col p-6 sm:p-9 lg:p-10">
            {/* Tagline */}
            <div className="h-4 w-32 rounded bg-gray-200 dark:bg-white/10" />

            {/* Title */}
            <div className="mt-4 space-y-2">
              <div className="h-8 w-4/5 rounded-lg bg-gray-300 sm:h-10 dark:bg-white/15" />
              <div className="h-8 w-2/3 rounded-lg bg-gray-300 sm:h-10 dark:bg-white/15" />
            </div>

            {/* Event Key Info Grid */}
            <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-100 bg-gray-50/80 p-3.5 dark:border-white/5 dark:bg-white/3"
                >
                  <div className="h-3 w-16 rounded bg-gray-200 dark:bg-white/10" />
                  <div className="mt-2 h-4 w-28 rounded bg-gray-300 dark:bg-white/15" />
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mt-8 space-y-2.5">
              <div className="h-4 w-full rounded bg-gray-200 dark:bg-white/10" />
              <div className="h-4 w-full rounded bg-gray-200 dark:bg-white/10" />
              <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-white/10" />
              <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-white/10" />
            </div>

            {/* Organizer Card Skeleton */}
            <div className="mt-8 flex items-center gap-3.5 rounded-2xl border border-gray-100 bg-gray-50/70 p-4 dark:border-white/5 dark:bg-white/3">
              <div className="h-11 w-11 rounded-full bg-gray-300 dark:bg-white/15" />
              <div className="space-y-1.5">
                <div className="h-4 w-32 rounded bg-gray-300 dark:bg-white/15" />
                <div className="h-3 w-44 rounded bg-gray-200 dark:bg-white/10" />
              </div>
            </div>

            {/* Action Button Skeleton */}
            <div className="mt-auto pt-8">
              <div className="h-12 w-full rounded-full bg-gray-300 dark:bg-white/20" />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

