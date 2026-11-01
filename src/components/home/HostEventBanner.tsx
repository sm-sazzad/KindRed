import Link from "next/link";
import {
  FaArrowRight,
  FaCirclePlus,
  FaHandHoldingHeart,
  FaShieldHeart,
  FaUsers,
  FaWandMagicSparkles,
} from "react-icons/fa6";

export default function HostEventBanner() {
  return (
    <section className="relative overflow-hidden bg-white px-[5%] py-12 text-[#142C45] transition-colors duration-300 sm:py-16 dark:bg-[#111b27] dark:text-[#f6f7f2]">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.2rem] border border-gray-200 bg-gradient-to-br from-[#142C45] via-[#17334f] to-[#102236] p-8 text-white shadow-xl sm:p-12 md:p-16 dark:border-white/10 dark:from-[#152a3e] dark:via-[#17314a] dark:to-[#101e2c] dark:shadow-[0_30px_90px_-40px_rgba(0,0,0,0.8)]">
          {/* Decorative radial lighting */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -right-20 h-96 w-96 rounded-full bg-[#d9e9c5]/[0.12] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-emerald-400/[0.08] blur-3xl"
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:gap-14">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.16em] text-[#d9e9c5] uppercase backdrop-blur-md">
                <FaWandMagicSparkles className="text-[11px]" />
                Lead Your Community
              </p>

              <h2 className="text-3xl leading-[1.06] font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                Have an initiative in mind?
                <br />
                <span className="text-[#d9e9c5]">Create your own event.</span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
                Whether it is a food distribution drive, hospital blood campaign,
                or a park cleanup—gather volunteers, manage attendees, and turn
                your vision for good into reality.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/create-event"
                  className="inline-flex items-center gap-2 rounded-full bg-[#d9e9c5] px-7 py-3.5 text-sm font-bold text-[#142C45] shadow-lg transition-all duration-300 hover:bg-white hover:shadow-xl focus-visible:outline-2 focus-visible:outline-white"
                >
                  <FaCirclePlus className="text-base text-[#142C45]" />
                  Host an Event
                </Link>

                <Link
                  href="/upcomming-events"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
                >
                  Browse Ongoing Events
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>

              {/* Trust pill */}
              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6 text-xs text-white/70">
                <span className="inline-flex items-center gap-2">
                  <FaShieldHeart className="text-sm text-[#d9e9c5]" />
                  100% Free Hosting
                </span>
                <span className="inline-flex items-center gap-2">
                  <FaUsers className="text-sm text-[#d9e9c5]" />
                  Verified Community Volunteers
                </span>
              </div>
            </div>

            {/* Right Card Illustration */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d9e9c5] text-[#142C45]">
                      <FaHandHoldingHeart className="text-lg" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">
                        Community Drive
                      </p>
                      <p className="text-[10px] text-white/60">Ready to launch</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-400/20 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                    Active
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="h-3 w-3/4 rounded-full bg-white/20" />
                  <div className="h-2.5 w-full rounded-full bg-white/10" />
                  <div className="h-2.5 w-5/6 rounded-full bg-white/10" />
                </div>

                <div className="mt-6 rounded-2xl bg-white/10 p-4">
                  <div className="flex justify-between text-xs font-semibold text-white/80">
                    <span>Volunteers</span>
                    <span className="text-[#d9e9c5]">34 / 50</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
                    <div className="h-full w-[68%] rounded-full bg-[#d9e9c5]" />
                  </div>
                </div>

                <Link
                  href="/create-event"
                  className="mt-5 block w-full rounded-xl bg-white py-3 text-center text-xs font-bold text-[#142C45] transition hover:bg-[#d9e9c5]"
                >
                  Start Your Initiative
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
