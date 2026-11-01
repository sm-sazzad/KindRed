import {
  FaCompass,
  FaHandHoldingHeart,
  FaUserCheck,
} from "react-icons/fa6";

const steps = [
  {
    step: "01",
    title: "Find a Cause",
    description:
      "Explore verified community initiatives—from tree plantations and food relief to blood donation drives.",
    icon: FaCompass,
    accent: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300",
  },
  {
    step: "02",
    title: "Join with One Click",
    description:
      "Sign in and register as a volunteer instantly. Keep track of all your upcoming commitments from your dashboard.",
    icon: FaUserCheck,
    accent: "bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-300",
  },
  {
    step: "03",
    title: "Make Real Impact",
    description:
      "Show up with like-minded changemakers, lend a helping hand, and see firsthand how small acts transform lives.",
    icon: FaHandHoldingHeart,
    accent: "bg-[#d9e9c5] text-[#142C45] dark:bg-[#d9e9c5]/20 dark:text-[#d9e9c5]",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white px-[5%] py-16 text-[#142C45] transition-colors duration-300 sm:py-20 lg:py-24 dark:bg-[#111b27] dark:text-[#f6f7f2]">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9e9c5]/[0.08] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl border-t border-gray-200 pt-9 transition-colors sm:pt-11 dark:border-white/10">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <p className="mb-3 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#5d8338] uppercase dark:text-[#d9e9c5]">
            <span className="h-px w-6 bg-[#5d8338] dark:bg-[#d9e9c5]" />
            Simple & Transparent
            <span className="h-px w-6 bg-[#5d8338] dark:bg-[#d9e9c5]" />
          </p>

          <h2 className="text-3xl leading-[1.05] font-extrabold tracking-tight text-[#142C45] sm:text-4xl md:text-5xl dark:text-white">
            How KindRed Works.
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#142C45]/70 sm:text-base dark:text-white/60">
            Turning kindness into collective action is easy. Here is how you can
            get started in just a few minutes.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {/* Connector line for desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-[18%] right-[18%] hidden h-0.5 -translate-y-6 border-t-2 border-dashed border-gray-200 lg:block dark:border-white/10"
          />

          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative flex flex-col rounded-3xl border border-gray-200 bg-[#F7F6F0] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#142C45]/30 hover:shadow-xl sm:p-8 dark:border-white/10 dark:bg-[#192736] dark:hover:border-white/20 dark:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.8)]"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${item.accent}`}
                  >
                    <Icon className="text-2xl" />
                  </div>
                  <span className="text-2xl font-extrabold tracking-tight text-[#142C45]/20 dark:text-white/20">
                    {item.step}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold tracking-tight text-[#142C45] dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#142C45]/70 dark:text-white/55">
                  {item.description}
                </p>

                <div className="mt-6 h-1 w-10 rounded-full bg-gray-200 transition-all duration-300 group-hover:w-16 group-hover:bg-[#5d8338] dark:bg-white/10 dark:group-hover:bg-[#d9e9c5]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

