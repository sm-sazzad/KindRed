import Link from "next/link";
import {
  FaArrowRight,
  FaBookOpen,
  FaBroom,
  FaBowlFood,
  FaDroplet,
  FaHeartPulse,
  FaLeaf,
  FaShirt,
  FaTruckMedical,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

export const categories = [
  {
    name: "Blood Donation",
    id: "blood-donation",
    description: "Give blood, give someone another chance at life.",
    icon: FaDroplet,
    accent: "text-rose-500 bg-rose-500/10 dark:text-rose-300 dark:bg-rose-300/10 group-hover:bg-rose-500/20",
  },
  {
    name: "Environment",
    id: "environment",
    description: "Protect nature and help build a greener future.",
    icon: FaLeaf,
    accent: "text-emerald-600 bg-emerald-600/10 dark:text-emerald-300 dark:bg-emerald-300/10 group-hover:bg-emerald-600/20",
  },
  {
    name: "Food & Hunger Relief",
    id: "food-relief",
    description: "Help bring a warm meal to someone who needs one.",
    icon: FaBowlFood,
    accent: "text-amber-600 bg-amber-600/10 dark:text-amber-200 dark:bg-amber-200/10 group-hover:bg-amber-600/20",
  },
  {
    name: "Clothing Donation",
    id: "clothing-donation",
    description: "Share clothing and comfort with your community.",
    icon: FaShirt,
    accent: "text-sky-600 bg-sky-600/10 dark:text-sky-300 dark:bg-sky-300/10 group-hover:bg-sky-600/20",
  },
  {
    name: "Education & Literacy",
    id: "education",
    description: "Open doors to learning, skills, and new possibilities.",
    icon: FaBookOpen,
    accent: "text-violet-600 bg-violet-600/10 dark:text-violet-300 dark:bg-violet-300/10 group-hover:bg-violet-600/20",
  },
  {
    name: "Healthcare",
    id: "healthcare",
    description: "Make care and wellbeing more accessible to everyone.",
    icon: FaHeartPulse,
    accent: "text-pink-600 bg-pink-600/10 dark:text-pink-300 dark:bg-pink-300/10 group-hover:bg-pink-600/20",
  },
  {
    name: "Disaster Relief",
    id: "disaster-relief",
    description: "Stand beside families when they need support most.",
    icon: FaTruckMedical,
    accent: "text-orange-600 bg-orange-600/10 dark:text-orange-200 dark:bg-orange-200/10 group-hover:bg-orange-600/20",
  },
  {
    name: "Community Cleanup",
    id: "community-cleanup",
    description: "Make shared spaces cleaner, safer, and more welcoming.",
    icon: FaBroom,
    accent: "text-teal-600 bg-teal-600/10 dark:text-teal-200 dark:bg-teal-200/10 group-hover:bg-teal-600/20",
  },
] satisfies {
  name: string;
  id: string;
  description: string;
  icon: IconType;
  accent: string;
}[];

const Category = () => {
  return (
    <section
      id="causes"
      className="relative overflow-hidden bg-white px-[5%] py-16 text-[#142C45] transition-colors duration-300 sm:py-20 lg:py-24 dark:bg-[#111b27] dark:text-[#f6f7f2]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#d9e9c5]/[0.08] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl border-t border-gray-200 pt-9 transition-colors sm:pt-11 dark:border-white/10">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#5d8338] uppercase dark:text-[#d9e9c5]">
              <span className="h-px w-6 bg-[#5d8338] dark:bg-[#d9e9c5]" />
              There&apos;s a place for everyone
            </p>
            <h2 className="max-w-2xl text-3xl leading-[1.05] font-extrabold tracking-[-0.045em] text-[#142C45] sm:text-4xl md:text-5xl dark:text-white">
              Find a cause
              <br className="hidden sm:block" /> that feels like yours.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#142C45]/70 sm:text-right dark:text-white/55">
            Big change starts with what matters to you. Choose a cause and find
            a simple way to make a difference.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.id}
                href={`/upcomming-events`}
                className="group relative flex min-h-[204px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-[#F7F6F0] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#142C45]/30 hover:bg-gray-100 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#142C45] focus-visible:outline-none sm:min-h-[216px] sm:p-6 dark:border-white/[0.09] dark:bg-white/[0.035] dark:hover:border-[#d9e9c5]/30 dark:hover:bg-white/[0.065] dark:hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.8)] dark:focus-visible:ring-[#d9e9c5]"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-12 -right-10 h-32 w-32 rounded-full bg-[#d9e9c5]/[0.08] blur-2xl transition-colors duration-300 group-hover:bg-[#d9e9c5]/20"
                />
                <div className="relative flex items-center justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105 ${category.accent}`}
                  >
                    <Icon aria-hidden="true" className="text-xl" />
                  </span>
                  <span className="text-[10px] font-semibold tracking-[0.16em] text-[#142C45]/35 dark:text-white/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative mt-6">
                  <h3 className="text-base font-bold tracking-tight text-[#142C45] transition-colors group-hover:text-[#254f38] dark:text-white dark:group-hover:text-[#d9e9c5]">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[#142C45]/60 dark:text-white/50">
                    {category.description}
                  </p>
                </div>

                <span className="relative mt-auto flex items-center gap-2 pt-5 text-xs font-semibold text-[#254f38] transition-all duration-300 group-hover:gap-3 dark:text-[#d9e9c5]/75 dark:group-hover:text-[#d9e9c5]">
                  Explore cause
                  <FaArrowRight aria-hidden="true" className="text-[10px]" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Category;
