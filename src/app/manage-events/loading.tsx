export default function ManageEventsLoading() {
  return (
    <main className="min-h-[65vh] bg-[#F7F6F0] px-[5%] py-12 text-[#142C45] transition-colors duration-300 sm:py-16 dark:bg-[#111b27]">
      <div className="mx-auto max-w-7xl animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-9 space-y-2">
          <div className="h-3.5 w-28 rounded bg-gray-200 dark:bg-white/10" />
          <div className="h-9 w-52 rounded-lg bg-gray-300 dark:bg-white/15" />
          <div className="h-4 w-64 rounded bg-gray-200 dark:bg-white/10" />
        </div>

        {/* Manage Cards Grid Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <article
              key={i}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#192736]"
            >
              {/* Image Skeleton */}
              <div className="relative h-48 w-full bg-gray-200 dark:bg-white/10">
                <div className="absolute top-4 left-4 h-6 w-24 rounded-full bg-black/15 dark:bg-white/15" />
              </div>

              {/* Content Skeleton */}
              <div className="p-5">
                <div className="h-5 w-3/4 rounded bg-gray-300 dark:bg-white/15" />
                <div className="mt-2.5 space-y-1.5">
                  <div className="h-3.5 w-full rounded bg-gray-200 dark:bg-white/10" />
                  <div className="h-3.5 w-4/5 rounded bg-gray-200 dark:bg-white/10" />
                </div>

                {/* Date & Location Skeleton */}
                <div className="mt-4 space-y-2">
                  <div className="h-3.5 w-1/2 rounded bg-gray-200 dark:bg-white/10" />
                  <div className="h-3.5 w-2/3 rounded bg-gray-200 dark:bg-white/10" />
                </div>

                {/* Edit & Delete Action Buttons Skeleton */}
                <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4 dark:border-white/5">
                  <div className="h-10 flex-1 rounded-xl bg-gray-200 dark:bg-white/10" />
                  <div className="h-10 flex-1 rounded-xl bg-gray-200 dark:bg-white/10" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

