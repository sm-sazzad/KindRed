import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCalendarDays,
  FaCheck,
  FaClock,
  FaLocationDot,
  FaUsers,
  FaBookmark,
} from "react-icons/fa6";

interface JoinedEvent {
  _id: string;
  email?: string;
  title: string;
  category?: string;
  description?: string;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  city?: string;
  organizer?: string;
  volunteerCapacity?: number;
  joinedVolunteers?: number;
  imageUrl?: string;
  status?: "upcoming" | "ongoing" | "completed";
  joinedAt?: string;
}

const cardGradients = [
  "from-[#d8c99e] via-[#87918e] to-[#344d62]",
  "from-[#d9b2b7] via-[#79818f] to-[#263d55]",
  "from-[#bed5c7] via-[#7e9c91] to-[#344c60]",
  "from-[#c7b9d8] via-[#8e8da8] to-[#344358]",
  "from-[#d4dfc4] via-[#8da49b] to-[#344b5c]",
  "from-[#c9d4e4] via-[#8598aa] to-[#354c62]",
];

function formatDate(value?: string) {
  if (!value) return "Date to be announced";
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

export default async function JoinedEventsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    return (
      <main className="min-h-[65vh] bg-[#111b27] px-[5%] py-16 text-[#f6f7f2]">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-[#192736] p-8 text-center sm:p-12">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d9e9c5]/10 text-3xl text-[#d9e9c5]">
            <FaBookmark />
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">Joined Events</h1>
          <p className="mt-3 text-sm text-white/55 sm:text-base">
            Please sign in to see all the events you have joined.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d9e9c5] px-6 py-3 text-sm font-bold text-[#203242] transition hover:bg-white"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  let joinedEvents: JoinedEvent[] = [];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const res = await fetch(`${apiUrl}/api/joined`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data: JoinedEvent[] = await res.json();
      if (Array.isArray(data)) {
        joinedEvents = data.filter(
          (event) => event.email === session.user.email,
        );
      }
    }
  } catch (error) {
    console.error("Error fetching joined events:", error);
  }
  console.log(joinedEvents);

  return (
    <main className="min-h-[65vh] bg-[#111b27] px-[5%] py-12 text-[#f6f7f2] sm:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="relative mb-10 overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-[#1a344b] via-[#172b3d] to-[#172435] p-6 sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full bg-[#d9e9c5]/[0.08] blur-3xl"
          />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] text-[#d9e9c5] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d9e9c5]" />
                Your Commitments
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                Joined Events
              </h1>
              <p className="mt-2 text-sm text-white/55 sm:text-base">
                Events you have registered to volunteer and participate in.
              </p>
            </div>

            <div className="flex shrink-0">
              <div className="rounded-2xl border border-white/10 bg-[#111b27]/40 px-5 py-3">
                <p className="text-3xl font-extrabold text-[#d9e9c5]">
                  {joinedEvents.length}
                </p>
                <p className="text-[11px] text-white/50">Events Joined</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {joinedEvents.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-20 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] text-2xl text-white/40">
              <FaBookmark />
            </div>
            <h2 className="text-2xl font-bold text-white">
              No Joined Events Yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
              You haven&apos;t joined any community events yet. Explore upcoming
              events and make an impact!
            </p>
            <Link
              href="/upcomming-events"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d9e9c5] px-6 py-3 text-xs font-bold text-[#203242] transition hover:bg-white"
            >
              Browse Events
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-8">
            {joinedEvents.map((event, index) => {
              const joined = event.joinedVolunteers || 0;
              const capacity = event.volunteerCapacity || 0;
              const volunteerProgress = capacity
                ? Math.min((joined / capacity) * 100, 100)
                : 0;

              return (
                <article
                  key={event._id || index}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-white/[0.09] bg-[#192736] shadow-[0_20px_60px_-35px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_28px_70px_-35px_rgba(0,0,0,0.9)]"
                >
                  {/* Event Image / Gradient Header */}
                  <div
                    className={`relative h-52 shrink-0 overflow-hidden bg-gradient-to-br sm:h-56 ${
                      cardGradients[index % cardGradients.length]
                    }`}
                  >
                    {event.imageUrl ? (
                      <Image
                        src={event.imageUrl}
                        alt={event.title || "Event Image"}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/10 text-xl font-bold text-white/90 backdrop-blur-sm">
                          {event.title || "KindRed"}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-b from-[#101a25]/25 via-transparent to-[#101a25]/60" />

                    {/* Top Badges */}
                    <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
                      <span className="max-w-[65%] truncate rounded-full border border-white/20 bg-[#111b27]/60 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md">
                        {event.category || "Community"}
                      </span>

                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#d9e9c5]/30 bg-[#182b26]/90 px-3 py-1.5 text-[10px] font-bold text-[#e2f1d2] backdrop-blur-md">
                        <FaCheck className="text-[9px]" />
                        Joined
                      </span>
                    </div>

                    {/* Date Badge */}
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#111b27]/60 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
                      <FaCalendarDays className="text-[#d9e9c5]" />
                      {formatDate(event.eventDate)}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h2 className="line-clamp-2 min-h-12 text-lg font-bold leading-6 tracking-tight text-white transition-colors group-hover:text-[#d9e9c5]">
                      {event.title}
                    </h2>

                    <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-white/50">
                      {event.description ||
                        "You are registered as a volunteer for this event."}
                    </p>

                    {/* Location */}
                    <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
                      <FaLocationDot className="shrink-0 text-[#d9e9c5]" />
                      <span className="truncate">
                        {[event.location, event.city]
                          .filter(Boolean)
                          .join(", ") || "Location to be announced"}
                      </span>
                    </div>

                    {/* Volunteer Capacity */}
                    <div className="mt-4 border-t border-white/10 pt-4">
                      <div className="flex items-center justify-between gap-3 text-xs">
                        <span className="inline-flex items-center gap-2 text-white/65">
                          <FaUsers className="text-[#d9e9c5]" />
                          {joined.toLocaleString("en-BD")} joined
                        </span>

                        {capacity > 0 && (
                          <span className="text-[10px] text-white/40">
                            {joined} / {capacity} volunteers
                          </span>
                        )}
                      </div>

                      {capacity > 0 && (
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-[#d9e9c5] transition-[width] duration-500"
                            style={{ width: `${volunteerProgress}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Time & Action Button */}
                    <div className="mt-auto pt-5">
                      {event.startTime && (
                        <p className="mb-3 inline-flex items-center gap-2 text-[10px] text-white/40">
                          <FaClock />
                          {event.startTime}
                          {event.endTime ? ` – ${event.endTime}` : ""}
                          {event.organizer
                            ? ` · Organized by ${event.organizer}`
                            : ""}
                        </p>
                      )}

                      <Link
                        href={`/upcomming-events/${event._id}`}
                        className="group/button inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 text-xs font-bold text-white transition-all duration-300 hover:border-[#d9e9c5]/30 hover:bg-[#d9e9c5] hover:text-[#203228] focus-visible:outline-none"
                      >
                        View Details
                        <FaArrowRight className="text-[10px] transition-transform group-hover/button:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Hover bottom line accent */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-[#d9e9c5] transition-[width] duration-500 ease-out group-hover:w-full"
                  />
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
