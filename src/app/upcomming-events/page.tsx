import EventFilter from "@/components/events/EventFilter";

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

const Page = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/events`,
    {
      cache: "no-store",
    },
  );

  const allEvents: Event[] = await response.json();

  const now = new Date();
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  const events = allEvents.filter((event) => {
    return event.eventDate >= today;
  });

  const upcomingCount = events.length;

  return (
    <section className="min-h-[65vh] bg-[#F7F6F0] px-[5%] py-14 text-[#142C45] transition-colors duration-300 sm:py-20 lg:py-24 dark:bg-[#111b27] dark:text-[#f6f7f2]">
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="relative mb-9 overflow-hidden rounded-[1.75rem] border border-gray-200 bg-[#142C45] p-6 text-white shadow-xl sm:mb-12 sm:p-9 md:p-12 dark:border-white/10 dark:bg-gradient-to-br dark:from-[#1a344b] dark:via-[#172b3d] dark:to-[#172435]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-10 h-80 w-80 rounded-full bg-[#d9e9c5]/[0.1] blur-3xl"
          />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] text-[#d9e9c5] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d9e9c5]" />
                Make your time matter
              </p>

              <h1 className="max-w-2xl text-4xl leading-[1.02] font-extrabold tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
                Good things happen
                <br className="hidden sm:block" /> when we show up.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                Discover community events, meet people who care, and find a
                meaningful way to make a difference.
              </p>
            </div>

            <div className="flex shrink-0 gap-3">
              <div className="min-w-[112px] rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
                <p className="text-2xl font-extrabold text-white">
                  {events.length.toLocaleString("en-BD")}
                </p>
                <p className="mt-1 text-[10px] text-white/60">All events</p>
              </div>

              <div className="min-w-[112px] rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
                <p className="text-2xl font-extrabold text-[#d9e9c5]">
                  {upcomingCount.toLocaleString("en-BD")}
                </p>
                <p className="mt-1 text-[10px] text-white/60">Upcoming</p>
              </div>
            </div>
          </div>
        </div>

        {/* Events Section */}
        {events.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-100 px-6 py-16 text-center sm:py-20 dark:border-white/15 dark:bg-white/[0.025]">
            <p className="text-xs font-bold tracking-[0.16em] text-[#5d8338] uppercase dark:text-[#d9e9c5]">
              A good thing is on its way
            </p>

            <h2 className="mt-3 text-2xl font-bold text-[#142C45] dark:text-white">
              No events to show just yet.
            </h2>

            <p className="mt-2 text-sm text-[#142C45]/60 dark:text-white/50">
              Check back soon to find a cause and community you love.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#142C45] sm:text-2xl dark:text-white">
                  Explore all events
                </h2>

                <p className="mt-1 text-xs text-[#142C45]/60 dark:text-white/45">
                  Find the right moment to lend a hand.
                </p>
              </div>

              <p className="shrink-0 text-xs font-medium text-[#142C45]/60 dark:text-white/45">
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
