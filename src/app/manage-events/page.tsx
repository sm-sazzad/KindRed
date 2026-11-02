import { auth } from "@/lib/auth";
import type { Event } from "@/components/events/types";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";
import Btn from "./Btn";
import { getTokenServer } from "@/lib/TokenAccess";

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

export default async function ManageEventsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let events: Event[] = [];
  let errorMessage = "";

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const response = await fetch(
      `${apiUrl}/api/events/email/${encodeURIComponent(session?.user.email || "")}`,
      {
        cache: "no-store",
        headers: { authorization: `Bearer ${await getTokenServer()}` },
      },
    );

    if (!response.ok) {
      throw new Error("Unable to load your events. Please try again later.");
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("The events service returned an unexpected response.");
    }

    events = data as Event[];
  } catch (error) {
    if (!(error instanceof Error)) {
      throw error;
    }

    errorMessage = error.message;
  }

  return (
    <main className="min-h-[65vh] bg-[#F7F6F0] px-[5%] py-12 text-[#142C45] transition-colors duration-300 sm:py-16 dark:bg-[#111b27] dark:text-[#f6f7f2]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5d8338] dark:text-[#d9e9c5]">
            Your community
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#142C45] sm:text-4xl dark:text-white">
            Your events
          </h1>
          <p className="mt-2 text-sm text-[#142C45]/60 dark:text-white/55">
            Events created by {session?.user.name || session?.user.email}.
          </p>
        </div>

        {errorMessage ? (
          <p
            role="alert"
            className="rounded-2xl border border-red-300/15 bg-red-300/6 px-5 py-4 text-sm text-red-500 dark:text-red-200"
          >
            {errorMessage}
          </p>
        ) : events.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-100 px-6 py-16 text-center dark:border-white/15 dark:bg-white/2.5">
            <h2 className="text-xl font-bold text-[#142C45] dark:text-white">
              You haven&apos;t created any events yet.
            </h2>
            <p className="mt-2 text-sm text-[#142C45]/60 dark:text-white/50">
              Your events will show up here once they are available.
            </p>
            <Link
              href="/create-event"
              className="mt-6 inline-flex rounded-xl bg-[#142C45] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1e3d5f] dark:bg-[#d9e9c5] dark:text-[#203242] dark:hover:bg-white"
            >
              Create an event
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-white/10 dark:bg-[#192736] dark:shadow-[0_20px_60px_-35px_rgba(0,0,0,0.8)]"
              >
                <div className="relative h-48 bg-linear-to-br from-[#d9e9c5]/30 via-[#1a344b] to-[#111b27]">
                  {event.imageUrl && (
                    <Image
                      src={event.imageUrl}
                      alt=""
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      className="object-cover"
                    />
                  )}
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#111b27]/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                    {event.category}
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="truncate text-lg font-bold text-[#142C45] dark:text-white">
                    {event.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-[#142C45]/70 dark:text-white/50">
                    {event.description}
                  </p>

                  <div className="mt-4 space-y-2 text-xs text-[#142C45]/70 dark:text-white/60">
                    <p className="flex items-center gap-2">
                      <FaCalendarDays
                        aria-hidden="true"
                        className="text-[#5d8338] dark:text-[#d9e9c5]"
                      />
                      {formatDate(event.eventDate)}
                      {event.startTime && ` · ${event.startTime}`}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaLocationDot
                        aria-hidden="true"
                        className="text-[#5d8338] dark:text-[#d9e9c5]"
                      />
                      {[event.location, event.city].filter(Boolean).join(", ")}
                    </p>
                    <p>
                      Created At:{" "}
                      {event.createdAt
                        ? new Date(event.createdAt).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>

                  <Btn event={event} />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
