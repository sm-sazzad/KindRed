import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarDays,
  FaCheck,
  FaClock,
  FaLocationDot,
  FaUser,
  FaUsers,
} from "react-icons/fa6";

interface Event {
  _id: string;
  title: string;
  category: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  city: string;
  organizer: string;
  organizerEmail: string;
  volunteerCapacity: number;
  joinedVolunteers: number;
  imageUrl: string;
  status: "upcoming" | "ongoing" | "completed";
}

const statusStyles = {
  upcoming: "border-[#d9e9c5]/25 bg-[#182b26]/80 text-[#e2f1d2]",
  ongoing: "border-sky-200/25 bg-sky-950/75 text-sky-100",
  completed: "border-white/15 bg-[#111b27]/65 text-white/85",
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
};

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`,
    {
      cache: "no-store",
    },
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch event details");
  }

  const event: Event = await res.json();

  if (!event || !event._id) {
    notFound();
  }

  const location = [event.location, event.city].filter(Boolean).join(", ");

  const joined = event.joinedVolunteers || 0;
  const capacity = event.volunteerCapacity || 0;

  const volunteerProgress = capacity
    ? Math.min((joined / capacity) * 100, 100)
    : 0;

  return (
    <div className="min-h-[65vh] bg-[#111b27] px-[5%] py-10 text-[#f6f7f2] sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/upcomming-events"
          className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/55 transition-colors hover:text-[#d9e9c5] sm:mb-8"
        >
          <FaArrowLeft className="text-xs transition-transform group-hover:-translate-x-1" />
          All events
        </Link>

        <article className="grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#192736] shadow-[0_30px_90px_-40px_rgba(0,0,0,0.8)] lg:grid-cols-[1.15fr_0.85fr]">
          {/* Event Image */}
          <div className="relative min-h-[300px] bg-gradient-to-br from-[#d8c99e] via-[#87918e] to-[#344d62] sm:min-h-[440px] lg:min-h-[620px]">
            {event.imageUrl && (
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 90vw, 60vw"
                className="object-cover"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-[#101a25]/25 via-transparent to-[#101a25]/65" />

            <span className="absolute top-5 left-5 rounded-full border border-white/20 bg-[#111b27]/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
              {event.category}
            </span>

            <span
              className={`absolute top-5 right-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold capitalize backdrop-blur-md ${statusStyles[event.status]}`}
            >
              {event.status === "completed" && <FaCheck />}
              {event.status}
            </span>

            <div className="absolute right-5 bottom-5 left-5">
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#111b27]/55 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
                <FaLocationDot className="text-[#d9e9c5]" />
                {location}
              </span>
            </div>
          </div>

          {/* Event Information */}
          <div className="flex flex-col p-6 sm:p-9 lg:p-10">
            <p className="text-xs font-bold tracking-[0.17em] text-[#d9e9c5] uppercase">
              Make your time matter
            </p>

            <h1 className="mt-4 text-3xl leading-tight font-extrabold tracking-[-0.04em] text-white sm:text-4xl">
              {event.title}
            </h1>

            <p className="mt-5 text-sm leading-7 text-white/60">
              {event.description}
            </p>

            <div className="mt-8 space-y-4 border-y border-white/10 py-6">
              <p className="flex items-center gap-3 text-sm text-white/75">
                <FaCalendarDays className="w-4 shrink-0 text-[#d9e9c5]" />
                {formatDate(event.eventDate)}
              </p>

              <p className="flex items-center gap-3 text-sm text-white/75">
                <FaClock className="w-4 shrink-0 text-[#d9e9c5]" />
                {event.startTime} – {event.endTime}
              </p>

              <p className="flex items-center gap-3 text-sm text-white/75">
                <FaUser className="w-4 shrink-0 text-[#d9e9c5]" />
                Organized by {event.organizer}
              </p>

              <p className="flex items-center gap-3 text-sm text-white/75">
                <FaUsers className="w-4 shrink-0 text-[#d9e9c5]" />
                {joined} volunteers joined
                {capacity ? ` · ${capacity} spots` : ""}
              </p>
            </div>

            {/* Volunteer Progress */}
            {capacity > 0 && (
              <div className="mt-6">
                <div className="mb-2 flex justify-between text-xs text-white/50">
                  <span>Volunteer spots filled</span>
                  <span>{Math.round(volunteerProgress)}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[#d9e9c5]"
                    style={{ width: `${volunteerProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Join Button */}
            <div className="mt-auto pt-8">
              {event.status === "upcoming" ? (
                <Link
                  href="/login"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#d9e9c5] px-5 py-3.5 text-sm font-bold text-[#203228] transition-colors hover:bg-white"
                >
                  Join this event
                  <FaArrowRight className="text-xs" />
                </Link>
              ) : (
                <p className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-xs text-white/60">
                  {event.status === "completed"
                    ? "This event has already taken place. Thank you to everyone who participated."
                    : "This event is happening now. Thank you to everyone taking part."}
                </p>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default EventDetailsPage;
