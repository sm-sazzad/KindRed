export default function JoinedEventsLoading() {
  return (
    <main className="min-h-[65vh] bg-[#F7F6F0] px-[5%] py-12 text-[#142C45] transition-colors duration-300 sm:py-16 dark:bg-[#111b27]">
      <div className="mx-auto max-w-7xl animate-pulse">
        {/* Header Section Skeleton */}
        <div className="relative mb-10 overflow-hidden rounded-[1.75rem] border border-gray-200 bg-[#142C45] p-6 shadow-xl sm:p-9 md:p-12 dark:border-white/10 dark:bg-[#172738]">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <div className="h-5 w-36 rounded-full bg-white/15" />
              <div className="h-10 w-64 rounded-lg bg-white/20 sm:h-12 sm:w-80" />
              <div className="h-4 w-72 rounded bg-white/10 sm:w-96" />
            </div>

            <div className="flex shrink-0">
              <div className="h-20 w-32 rounded-2xl border border-white/15 bg-white/10" />
            </div>
          </div>
        </div>

        {/* Joined Event Cards Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {[...Array(6)].map((_, i) => (
            <article
              key={i}
              className="flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#192736]"
            >
              {/* Card Banner Skeleton */}
              <div className="relative h-44 w-full bg-gray-200 dark:bg-white/10">
                <div className="absolute top-4 left-4 h-7 w-24 rounded-full bg-black/15 dark:bg-white/15" />
                <div className="absolute top-4 right-4 h-7 w-20 rounded-full bg-black/15 dark:bg-white/15" />
              </div>

              {/* Card Body Skeleton */}
              <div className="flex flex-1 flex-col p-5">
                <div className="h-5 w-4/5 rounded bg-gray-300 dark:bg-white/15" />
                <div className="mt-3 space-y-2">
                  <div className="h-3.5 w-full rounded bg-gray-200 dark:bg-white/10" />
                  <div className="h-3.5 w-2/3 rounded bg-gray-200 dark:bg-white/10" />
                </div>

                {/* Location Skeleton */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-3.5 w-3.5 rounded-full bg-gray-200 dark:bg-white/10" />
                  <div className="h-3.5 w-40 rounded bg-gray-200 dark:bg-white/10" />
                </div>

                {/* Time & Action Button Skeleton */}
                <div className="mt-auto border-t border-gray-100 pt-5 dark:border-white/5">
                  <div className="mb-3 h-3 w-48 rounded bg-gray-200 dark:bg-white/10" />
                  <div className="h-10 w-full rounded-xl bg-gray-200 dark:bg-white/10" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

