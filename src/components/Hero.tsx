import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaLocationDot } from "react-icons/fa6";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#111b27] text-[#f6f7f2]">
      <div className="mx-auto grid min-h-[calc(100vh-76px)] w-[90%] max-w-7xl items-center gap-12 border-b border-white/10 py-12 md:grid-cols-2 md:gap-10 md:py-16 lg:gap-16">
        <div className="py-4">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/85">
            <span className="h-2 w-2 rounded-full bg-[#d9e9c5]" />
            Together, we create change
          </div>

          <h1 className="max-w-xl text-5xl leading-[0.98] font-extrabold tracking-[-0.055em] sm:text-6xl lg:text-[4.5rem]">
            Small Acts.
            <br />
            Big Changes<span className="text-[#d9e9c5]">..</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-7 text-white/60 sm:text-lg">
            Discover meaningful ways to support your community, connect with
            passionate people, and turn kindness into real-world impact.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/upcomming-events"
              className="inline-flex items-center gap-2 rounded-full bg-[#17324c] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#234665]"
            >
              Explore Events <FaArrowRight className="text-xs" />
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Create an Event
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-between gap-5 border-t border-white/15 pt-7">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2.5" aria-label="Community members">
                {[
                  ["SA", "#a9cdbd"],
                  ["RK", "#e7d7ad"],
                  ["MJ", "#a9bfd8"],
                ].map(([initials, color]) => (
                  <span
                    key={initials}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#111b27] text-[10px] font-extrabold text-[#243446]"
                    style={{ backgroundColor: color }}
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  12.4k volunteers joined
                </p>
                <p className="mt-0.5 text-sm text-white/55">
                  Across 8 districts this winter
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live impact
            </span>
          </div>
        </div>

        <div className="relative mx-auto h-[440px] w-full max-w-[540px] sm:h-[560px] lg:h-[640px]">
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-[#31566c]">
            <Image
              src="/assests/hero-img.jpg"
              alt="Community volunteers joining hands"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#172d42]/60 via-[#172d42]/15 to-[#d9e9c5]/80" />

            <div className="absolute right-8 bottom-8 left-8 flex items-end justify-between border-b border-white/25 pb-4 text-[11px] font-bold tracking-[0.1em] text-white/80">
              <span>VOLUNTEER COMMUNITY · DHAKA 2024</span>
              <FaLocationDot aria-hidden="true" />
            </div>
          </div>

          <div className="absolute top-[18%] -left-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1a2938] px-4 py-3 shadow-xl sm:-left-12">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9e9c5]">
              <span className="h-3 w-3 rounded-full bg-white" />
            </span>
            <span>
              <span className="block text-[10px] font-semibold tracking-wide text-white/50">
                ACTIVE IN
              </span>
              <span className="mt-0.5 block text-xs font-bold text-white">
                Dhaka · 24 events
              </span>
            </span>
          </div>

          <div className="absolute right-2 bottom-[14%] w-[205px] rounded-2xl border border-white/10 bg-[#1a2938] p-4 shadow-xl sm:-right-2">
            <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.1em] text-white/50">
              COMMUNITY IMPACT
              <span className="rounded-full bg-[#d9e9c5] px-2 py-1 text-[9px] tracking-normal text-[#314337]">
                +12%
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-white">
                12.4k
              </span>
              <span className="text-[11px] leading-tight text-white/60">
                volunteers
                <br />
                this month
              </span>
            </div>
            <div className="mt-2 ml-auto h-1 w-14 rounded-full bg-[#d9e9c5]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
