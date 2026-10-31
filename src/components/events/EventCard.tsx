import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCalendarDays,
  FaCheck,
  FaClock,
  FaLocationDot,
  FaUsers,
} from "react-icons/fa6";
import type { Event } from "./types";

const cardGradients = [
  "from-[#d8c99e] via-[#87918e] to-[#344d62]",
  "from-[#d9b2b7] via-[#79818f] to-[#263d55]",
  "from-[#bed5c7] via-[#7e9c91] to-[#344c60]",
  "from-[#c7b9d8] via-[#8e8da8] to-[#344358]",
  "from-[#d4dfc4] via-[#8da49b] to-[#344b5c]",
  "from-[#c9d4e4] via-[#8598aa] to-[#354c62]",
] as const;

const statusStyles: Record<Event["status"], string> = {
  upcoming: "border-[#d9e9c5]/25 bg-[#182b26]/80 text-[#e2f1d2]",
  ongoing: "border-sky-200/25 bg-sky-950/75 text-sky-100",
  completed: "border-white/15 bg-[#111b27]/65 text-white/85",
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Date to be announced";
  }

  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getInitials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function EventCard({
  event,
  index,
}: {
  event: Event;
  index: number;
}) {
  const joined = event.joinedVolunteers || 0;
  const capacity = event.volunteerCapacity || 0;
  const volunteerProgress = capacity
    ? Math.min((joined / capacity) * 100, 100)
    : 0;
  const imageUrl =
    typeof event.imageUrl === "string" ? event.imageUrl.trim() : "";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-white/[0.09] bg-[#192736] shadow-[0_20px_60px_-35px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_28px_70px_-35px_rgba(0,0,0,0.9)]">
      <div
        className={`relative h-52 shrink-0 overflow-hidden bg-gradient-to-br sm:h-56 ${cardGradients[index % cardGradients.length]}`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/10 text-xl font-bold text-white/90 backdrop-blur-sm">
              {getInitials(event.title)}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-[#101a25]/25 via-transparent to-[#101a25]/60" />

        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
          <span className="max-w-[65%] truncate rounded-full border border-white/20 bg-[#111b27]/45 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md">
            {event.category || "Community event"}
          </span>
          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold capitalize backdrop-blur-md ${statusStyles[event.status]}`}
          >
            {event.status === "completed" && (
              <FaCheck aria-hidden="true" className="text-[9px]" />
            )}
            {event.status}
          </span>
        </div>

        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#111b27]/55 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
          <FaCalendarDays aria-hidden="true" className="text-[#d9e9c5]" />
          {formatDate(event.eventDate)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="line-clamp-2 min-h-12 text-lg leading-6 font-bold tracking-tight text-white transition-colors group-hover:text-[#d9e9c5]">
          {event.title}
        </h2>
        <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-white/50">
          {event.description || "Join your community and make a difference."}
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
          <FaLocationDot
            aria-hidden="true"
            className="shrink-0 text-[#d9e9c5]"
          />
          <span className="truncate">
            {[event.location, event.city].filter(Boolean).join(", ") ||
              "Location to be announced"}
          </span>
        </div>

        <div className="mt-4 border-t border-white/10 pt-4">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="inline-flex items-center gap-2 text-white/65">
              <FaUsers aria-hidden="true" className="text-[#d9e9c5]" />
              {joined.toLocaleString("en-BD")} joined
            </span>
            {capacity > 0 && (
              <span className="text-[10px] text-white/40">
                {joined.toLocaleString("en-BD")} /{" "}
                {capacity.toLocaleString("en-BD")} volunteers
              </span>
            )}
          </div>
          {capacity > 0 && (
            <div
              role="progressbar"
              aria-label="Volunteer capacity"
              aria-valuenow={Math.round(volunteerProgress)}
              aria-valuemin={0}
              aria-valuemax={100}
              className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"
            >
              <div
                className="h-full rounded-full bg-[#d9e9c5] transition-[width] duration-500"
                style={{ width: `${volunteerProgress}%` }}
              />
            </div>
          )}
        </div>

        <div className="mt-auto pt-5">
          {event.startTime && (
            <p className="mb-3 inline-flex items-center gap-2 text-[10px] text-white/40">
              <FaClock aria-hidden="true" />
              {event.startTime}
              {event.endTime ? ` – ${event.endTime}` : ""}
              {event.organizer ? ` · Organized by ${event.organizer}` : ""}
            </p>
          )}
          <Link
            href={`/upcomming-events/${event._id}`}
            className="group/button inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 text-xs font-bold text-white transition-all duration-300 hover:border-[#d9e9c5]/30 hover:bg-[#d9e9c5] hover:text-[#203228] focus-visible:ring-2 focus-visible:ring-[#d9e9c5] focus-visible:outline-none"
          >
            View details
            <FaArrowRight
              aria-hidden="true"
              className="text-[10px] transition-transform group-hover/button:translate-x-1"
            />
          </Link>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-[#d9e9c5] transition-[width] duration-500 ease-out group-hover:w-full group-focus-within:w-full"
      />
    </article>
  );
}
