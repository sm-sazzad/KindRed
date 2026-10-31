import EventFilter from "@/components/events/EventFilter";
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

export interface Event {
  _id: string;
  title: string;
  category: string;
  categoryId: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  city: string;
  organizer: string;
  volunteerCapacity: number;
  joinedVolunteers: number;
  imageUrl: string;
  status: "upcoming" | "ongoing" | "completed";
}

const cardGradients = [
  "from-[#d8c99e] via-[#87918e] to-[#344d62]",
  "from-[#d9b2b7] via-[#79818f] to-[#263d55]",
  "from-[#bed5c7] via-[#7e9c91] to-[#344c60]",
  "from-[#c7b9d8] via-[#8e8da8] to-[#344358]",
  "from-[#d4dfc4] via-[#8da49b] to-[#344b5c]",
  "from-[#c9d4e4] via-[#8598aa] to-[#354c62]",
];

const statusStyles: Record<Event["status"], string> = {
  upcoming: "border-[#d9e9c5]/25 bg-[#182b26]/80 text-[#e2f1d2]",
  ongoing: "border-sky-200/25 bg-sky-950/75 text-sky-100",
  completed: "border-white/15 bg-[#111b27]/65 text-white/85",
};

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date to be announced";
  }

  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const getInitials = (value: string) => {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const EventCard = ({ event, index }: { event: Event; index: number }) => {
  const joined = event.joinedVolunteers || 0;
  const capacity = event.volunteerCapacity || 0;

  const volunteerProgress = capacity
    ? Math.min((joined / capacity) * 100, 100)
    : 0;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-white/[0.09] bg-[#192736] shadow-[0_20px_60px_-35px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_28px_70px_-35px_rgba(0,0,0,0.9)]">
      {/* Event Image */}
      <div
        className={`relative h-52 shrink-0 overflow-hidden bg-gradient-to-br sm:h-56 ${cardGradients[index % cardGradients.length]}`}
      >
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
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
            {event.status === "completed" && <FaCheck />}
            {event.status}
          </span>
        </div>

        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#111b27]/55 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
          <FaCalendarDays className="text-[#d9e9c5]" />
          {formatDate(event.eventDate)}
        </span>
      </div>

      {/* Event Information */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="line-clamp-2 min-h-12 text-lg leading-6 font-bold tracking-tight text-white transition-colors group-hover:text-[#d9e9c5]">
          {event.title}
        </h2>

        <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-white/50">
          {event.description || "Join your community and make a difference."}
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
          <FaLocationDot className="shrink-0 text-[#d9e9c5]" />
          <span className="truncate">
            {[event.location, event.city].filter(Boolean).join(", ") ||
              "Location to be announced"}
          </span>
        </div>

        {/* Volunteer Information */}
        <div className="mt-4 border-t border-white/10 pt-4">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="inline-flex items-center gap-2 text-white/65">
              <FaUsers className="text-[#d9e9c5]" />
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
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#d9e9c5] transition-[width] duration-500"
                style={{ width: `${volunteerProgress}%` }}
              />
            </div>
          )}
        </div>

        {/* Event Time & Organizer */}
        <div className="mt-auto pt-5">
          {event.startTime && (
            <p className="mb-3 inline-flex items-center gap-2 text-[10px] text-white/40">
              <FaClock />
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
            <FaArrowRight className="text-[10px] transition-transform group-hover/button:translate-x-1" />
          </Link>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-[#d9e9c5] transition-[width] duration-500 ease-out group-hover:w-full group-focus-within:w-full"
      />
    </article>
  );
};

const Page = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/events`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const allEvents: Event[] = await res.json();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const events = allEvents.filter((event) => {
    const eventDate = new Date(`${event.eventDate}T00:00:00`);
    return eventDate >= today;
  });

  const upcomingCount = events.length;

  return (
    <section className="min-h-[65vh] bg-[#111b27] px-[5%] py-14 text-[#f6f7f2] sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="relative mb-9 overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-[#1a344b] via-[#172b3d] to-[#172435] p-6 sm:mb-12 sm:p-9 md:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-10 h-80 w-80 rounded-full bg-[#d9e9c5]/[0.07] blur-3xl"
          />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] text-[#d9e9c5] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d9e9c5]" />
                Make your time matter
              </p>

              <h1 className="max-w-2xl text-4xl leading-[1.02] font-extrabold tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
                Good things happen
                <br className="hidden sm:block" /> when we show up.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-white/55 sm:text-base">
                Discover community events, meet people who care, and find a
                meaningful way to make a difference.
              </p>
            </div>

            <div className="flex shrink-0 gap-3">
              <div className="min-w-[112px] rounded-2xl border border-white/10 bg-[#111b27]/35 px-4 py-3">
                <p className="text-2xl font-extrabold text-white">
                  {events.length.toLocaleString("en-BD")}
                </p>
                <p className="mt-1 text-[10px] text-white/50">All events</p>
              </div>

              <div className="min-w-[112px] rounded-2xl border border-white/10 bg-[#111b27]/35 px-4 py-3">
                <p className="text-2xl font-extrabold text-[#d9e9c5]">
                  {upcomingCount.toLocaleString("en-BD")}
                </p>
                <p className="mt-1 text-[10px] text-white/50">Upcoming</p>
              </div>
            </div>
          </div>
        </div>

        {/* Events Section */}
        {events.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.025] px-6 py-16 text-center sm:py-20">
            <p className="text-xs font-bold tracking-[0.16em] text-[#d9e9c5] uppercase">
              A good thing is on its way
            </p>

            <h2 className="mt-3 text-2xl font-bold text-white">
              No events to show just yet.
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Check back soon to find a cause and community you love.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Explore all events
                </h2>

                <p className="mt-1 text-xs text-white/45">
                  Find the right moment to lend a hand.
                </p>
              </div>

              <p className="shrink-0 text-xs font-medium text-white/45">
                {events.length.toLocaleString("en-BD")}{" "}
                {events.length === 1 ? "event" : "events"}
              </p>
            </div>

            <div className="grid items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              <EventFilter events={events} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
