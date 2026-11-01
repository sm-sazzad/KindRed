import {
  FaCalendarCheck,
  FaHeartCircleCheck,
  FaMapLocationDot,
  FaUsers,
} from "react-icons/fa6";

const stats = [
  {
    value: "50+",
    label: "Events Completed",
    description: "Real-world ground events delivered",
    icon: FaCalendarCheck,
  },
  {
    value: "12.4k+",
    label: "Volunteers Joined",
    description: "Passionate changemakers taking action",
    icon: FaUsers,
  },
  {
    value: "8+",
    label: "Districts Reached",
    description: "Across divisional hubs in Bangladesh",
    icon: FaMapLocationDot,
  },
  {
    value: "100%",
    label: "Free & Community Driven",
    description: "Non-profit initiative for collective good",
    icon: FaHeartCircleCheck,
  },
];

export default function ImpactStats() {
  return (
    <section className="relative overflow-hidden bg-white px-[5%] py-12 text-[#142C45] transition-colors duration-300 sm:py-16 dark:bg-[#111b27] dark:text-[#f6f7f2]">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-[#F7F6F0] p-8 shadow-sm sm:p-12 lg:p-14 dark:border-white/10 dark:bg-[#192736]/70 dark:shadow-[0_24px_70px_-35px_rgba(0,0,0,0.8)]">
          {/* Subtle background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#d9e9c5]/[0.15] blur-3xl"
          />

          <div className="relative mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#5d8338] uppercase dark:text-[#d9e9c5]">
                <span className="h-px w-6 bg-[#5d8338] dark:bg-[#d9e9c5]" />
                Our Collective Impact
              </p>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#142C45] sm:text-3xl md:text-4xl dark:text-white">
                Every number is a life touched.
              </h2>
            </div>
            <p className="max-w-md text-xs leading-5 text-[#142C45]/70 sm:text-sm sm:leading-6 dark:text-white/60">
              Together with generous souls and active volunteers, small daily
              initiatives add up to significant local progress.
            </p>
          </div>

          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="group relative flex flex-col rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#5d8338]/40 hover:shadow-md dark:border-white/10 dark:bg-[#111b27]/80 dark:hover:border-[#d9e9c5]/30"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#d9e9c5]/40 text-[#142C45] transition-transform duration-300 group-hover:scale-110 dark:bg-[#d9e9c5]/15 dark:text-[#d9e9c5]">
                    <Icon className="text-xl" />
                  </div>

                  <p className="text-3xl font-extrabold tracking-tight text-[#142C45] sm:text-4xl dark:text-white">
                    {item.value}
                  </p>

                  <h3 className="mt-2 text-sm font-bold text-[#142C45] dark:text-white">
                    {item.label}
                  </h3>

                  <p className="mt-1 text-xs text-[#142C45]/60 dark:text-white/50">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

