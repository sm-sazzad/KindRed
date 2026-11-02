import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCalendarDays,
  FaLocationDot,
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
  organizerEmail: string;
  volunteerCapacity: number;
  joinedVolunteers: number;
  imageUrl: string;
  status: "upcoming" | "ongoing" | "completed";
}

const artworkGradients = [
  "from-[#d8c99e] via-[#87918e] to-[#344d62]",
  "from-[#d9b2b7] via-[#79818f] to-[#263d55]",
  "from-[#bed5c7] via-[#7e9c91] to-[#344c60]",
  "from-[#c7b9d8] via-[#8e8da8] to-[#344358]",
  "from-[#d4dfc4] via-[#8da49b] to-[#344b5c]",
  "from-[#c9d4e4] via-[#8598aa] to-[#354c62]",
];

function formatDate(value: string) {
  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return "Date to be announced";
  }

  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function EventArtwork({
  event,
  index,
  sizes,
  priority = false,
}: {
  event: Event;
  index: number;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-gradient-to-br ${artworkGradients[index % artworkGradients.length]}`}
    >
      {event.imageUrl ? (
        <Image
          src={event.imageUrl}
          alt=""
          fill
          unoptimized
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/10 text-xl font-bold text-white/85 backdrop-blur-sm">
            {event.title}
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-[#101a25]/10 via-transparent to-[#101a25]/75" />
    </div>
  );
}

function EventMeta({
  event,
  prominent = false,
}: {
  event: Event;
  prominent?: boolean;
}) {
  const location = [event.location, event.city].filter(Boolean).join(", ");
  const date = formatDate(event.eventDate);

  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${
        prominent ? "text-xs text-white/75" : "text-[11px] text-white/55"
      }`}
    >
      <span className="inline-flex items-center gap-1.5">
        <FaLocationDot className="shrink-0 text-[#d9e9c5]" />
        <span className="line-clamp-1">
          {location || "Location to be announced"}
        </span>
      </span>

      <span className="inline-flex items-center gap-1.5">
        <FaCalendarDays className="shrink-0 text-[#d9e9c5]" />
        {date}
      </span>
    </div>
  );
}

function FeaturedEventCard({ event, index }: { event: Event; index: number }) {
  return (
    <article className="group relative isolate min-h-[410px] overflow-hidden rounded-[1.65rem] border border-gray-200 bg-[#1a2938] shadow-[0_24px_70px_-35px_rgba(0,0,0,0.8)] sm:min-h-[470px] dark:border-white/10">
      <EventArtwork
        event={event}
        index={index}
        priority
        sizes="(max-width: 1024px) 90vw, 55vw"
      />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5 sm:p-6">
        <span className="rounded-full border border-white/20 bg-[#d9e9c5] px-3 py-1.5 text-[10px] font-bold tracking-wide text-[#263a32] shadow-sm">
          {event.category}
        </span>

        <span className="rounded-full border border-white/20 bg-[#111b27]/35 px-3 py-1.5 text-[10px] font-semibold text-white/90 backdrop-blur-md">
          Featured event
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <p className="mb-2 text-[10px] font-bold tracking-[0.17em] text-[#d9e9c5] uppercase">
          {event.city || "Community event"}
        </p>

        <h3 className="max-w-xl text-2xl leading-tight font-bold tracking-tight text-white sm:text-3xl">
          {event.title}
        </h3>

        {event.description && (
          <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-6 text-white/70">
            {event.description}
          </p>
        )}

        <div className="mt-4">
          <EventMeta event={event} prominent />
        </div>

        <Link
          href={`/upcomming-events/${event._id}`}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-[#172737] transition-colors hover:bg-[#d9e9c5]"
        >
          View event
          <FaArrowRight className="text-[10px]" />
        </Link>
      </div>
    </article>
  );
}

function SideEventCard({ event, index }: { event: Event; index: number }) {
  return (
    <article className="group relative flex min-h-0 overflow-hidden rounded-2xl border border-gray-200 bg-[#F7F6F0] p-3.5 transition-colors hover:border-gray-300 sm:p-4 dark:border-white/10 dark:bg-[#1a2938] dark:hover:border-white/20">
      <div className="relative min-h-[126px] w-[34%] shrink-0 overflow-hidden rounded-xl sm:min-h-[144px] sm:w-[31%]">
        <EventArtwork
          event={event}
          index={index}
          sizes="(max-width: 640px) 30vw, 160px"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start py-1 pl-4">
        <span className="max-w-full truncate rounded-full bg-[#d9e9c5] px-2.5 py-1 text-[9px] font-bold text-[#263a32]">
          {event.category}
        </span>

        <h3 className="mt-2 line-clamp-2 text-sm leading-5 font-bold text-[#142C45] sm:text-base dark:text-white">
          {event.title}
        </h3>

        <p className="mt-1 line-clamp-1 text-[10px] text-[#142C45]/60 dark:text-white/50">
          {event.city || event.location || "Community event"}
        </p>

        <Link
          href={`/upcomming-events/${event._id}`}
          className="mt-auto inline-flex items-center gap-1 pt-2 text-[11px] font-bold text-[#2e593a] underline decoration-[#2e593a]/30 underline-offset-4 transition-colors hover:text-[#142C45] dark:text-[#d9e9c5] dark:decoration-white/30 dark:hover:text-white"
        >
          View details
          <FaArrowRight className="text-[9px]" />
        </Link>
      </div>
    </article>
  );
}

function SmallEventCard({ event, index }: { event: Event; index: number }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-[#F7F6F0] transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl dark:border-white/10 dark:bg-[#1a2938] dark:hover:border-white/20">
      <div className="relative h-40 overflow-hidden sm:h-44">
        <EventArtwork
          event={event}
          index={index}
          sizes="(max-width: 768px) 90vw, 30vw"
        />

        <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-[#111b27]/45 px-2.5 py-1 text-[9px] font-semibold text-white backdrop-blur-md">
          {event.category}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-3 text-[10px] text-[#142C45]/60 dark:text-white/50">
          <span className="truncate">{event.city || event.location}</span>
          <span className="shrink-0">{formatDate(event.eventDate)}</span>
        </div>

        <h3 className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 font-bold text-[#142C45] dark:text-white">
          {event.title}
        </h3>

        <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-white/10">
          <span className="text-[10px] text-[#142C45]/60 dark:text-white/50">
            {event.category}
          </span>

          <Link
            href={`/upcomming-events/${event._id}`}
            aria-label={`View ${event.title}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-[#142C45] transition-colors hover:bg-[#142C45] hover:text-white dark:border-white/10 dark:text-[#d9e9c5] dark:hover:bg-[#d9e9c5] dark:hover:text-[#172737]"
          >
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </article>
  );
}

const FeaturedPosts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/featured`,
    { cache: "no-store" },
  );

  const allEvents = response.ok ? await response.json() : [];
  const events: Event[] = Array.isArray(allEvents) ? allEvents : [];

  const [featuredEvent, ...remainingEvents] = events;

  const sideEvents = remainingEvents.slice(0, 2);
  const bottomEvents = remainingEvents.slice(2, 5);

  return (
    <section className="bg-white px-[5%] py-16 text-[#142C45] transition-colors duration-300 sm:py-20 lg:py-24 dark:bg-[#111b27] dark:text-[#f6f7f2]">
      <div className="mx-auto max-w-7xl border-t border-gray-200 pt-9 transition-colors sm:pt-11 dark:border-white/10">
        <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#5d8338] uppercase dark:text-[#d9e9c5]">
              <span className="h-px w-6 bg-[#5d8338] dark:bg-[#d9e9c5]" />
              Make a difference
            </p>

            <h2 className="text-3xl leading-[1.02] font-extrabold tracking-[-0.045em] text-[#142C45] sm:text-4xl md:text-5xl dark:text-white">
              Find Your Next
              <br />
              Way to Give Back.
            </h2>
          </div>

          <Link
            href="/upcomming-events"
            className="mb-1 inline-flex shrink-0 items-center gap-2 border-b border-gray-300 pb-1 text-xs font-semibold text-[#142C45]/75 transition-colors hover:border-[#5d8338] hover:text-[#5d8338] dark:border-white/40 dark:text-white/75 dark:hover:border-[#d9e9c5] dark:hover:text-[#d9e9c5]"
          >
            View all events
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-10 text-center text-sm text-[#142C45]/70 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60">
            No events are available right now. Check back soon to find a way to
            give back.
          </div>
        ) : (
          <>
            <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1.3fr_0.95fr]">
              {featuredEvent && (
                <FeaturedEventCard event={featuredEvent} index={0} />
              )}

              {sideEvents.length > 0 && (
                <div className="grid h-full min-h-0 grid-rows-2 gap-3 sm:gap-4">
                  {sideEvents.map((event, index) => (
                    <SideEventCard
                      key={event._id}
                      event={event}
                      index={index + 1}
                    />
                  ))}
                </div>
              )}
            </div>

            {bottomEvents.length > 0 && (
              <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {bottomEvents.map((event, index) => (
                  <SmallEventCard
                    key={event._id}
                    event={event}
                    index={index + 3}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedPosts;
