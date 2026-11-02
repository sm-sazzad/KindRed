export default function RootLoading() {
  return (
    <div className="min-h-[70vh] bg-white px-[5%] py-12 text-[#142C45] transition-colors duration-300 sm:py-16 dark:bg-[#111b27]">
      <div className="mx-auto max-w-7xl animate-pulse space-y-12">
        {/* Top Hero Shimmer */}
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <div className="h-6 w-36 rounded-full bg-gray-200 dark:bg-white/10" />
            <div className="space-y-2">
              <div className="h-10 w-4/5 rounded-xl bg-gray-300 dark:bg-white/15" />
              <div className="h-10 w-3/5 rounded-xl bg-gray-300 dark:bg-white/15" />
            </div>
            <div className="h-4 w-full max-w-md rounded bg-gray-200 dark:bg-white/10" />
            <div className="flex gap-3 pt-2">
              <div className="h-11 w-32 rounded-full bg-gray-300 dark:bg-white/15" />
              <div className="h-11 w-32 rounded-full bg-gray-200 dark:bg-white/10" />
            </div>
          </div>

          <div className="h-72 w-full rounded-3xl bg-gray-200 sm:h-96 dark:bg-white/10" />
        </div>

        {/* Cards Grid Shimmer */}
        <div className="pt-6">
          <div className="mb-6 h-7 w-48 rounded bg-gray-200 dark:bg-white/10" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#192736]"
              >
                <div className="h-44 w-full rounded-xl bg-gray-200 dark:bg-white/10" />
                <div className="mt-4 space-y-2">
                  <div className="h-5 w-3/4 rounded bg-gray-300 dark:bg-white/15" />
                  <div className="h-3.5 w-full rounded bg-gray-200 dark:bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

