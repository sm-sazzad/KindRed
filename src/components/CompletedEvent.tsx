import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCalendarDays,
  FaCheck,
  FaLocationDot,
  FaUsers,
} from "react-icons/fa6";

const completed = [
  {
    title: "Community Blood Donation Drive",
    category: "Blood Donation",
    categoryId: "blood-donation",
    description:
      "Successfully organized a community blood donation campaign with local volunteers to support patients in need.",
    eventDate: "2026-10-10",
    startTime: "09:00",
    endTime: "15:00",
    location: "Kushtia General Hospital",
    city: "Kushtia",
    organizer: "Life Savers Foundation",
    organizerEmail: "lifesavers@example.com",
    joinedVolunteers: 32,
    imageUrl:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80",
    status: "completed",
  },
  {
    title: "Green Kushtia Tree Plantation",
    category: "Environment",
    categoryId: "environment",
    description:
      "Volunteers planted native trees in public spaces to promote a greener and healthier community.",
    eventDate: "2026-10-12",
    startTime: "08:00",
    endTime: "12:00",
    location: "Municipal Park",
    city: "Kushtia",
    organizer: "Green Future Bangladesh",
    organizerEmail: "greenfuture@example.com",
    joinedVolunteers: 45,
    imageUrl:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80",
    status: "completed",
  },
  {
    title: "Meals for the Needy",
    category: "Food & Hunger Relief",
    categoryId: "food-relief",
    description:
      "Prepared and distributed nutritious meals among underprivileged families and people experiencing food insecurity.",
    eventDate: "2026-10-15",
    startTime: "10:00",
    endTime: "14:00",
    location: "Railway Station Area",
    city: "Rajbari",
    organizer: "Share a Meal Foundation",
    organizerEmail: "sharemeal@example.com",
    joinedVolunteers: 28,
    imageUrl:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    status: "completed",
  },
  {
    title: "Winter Clothes Distribution",
    category: "Clothing Donation",
    categoryId: "clothing-donation",
    description:
      "Collected and distributed warm clothes and blankets to families who needed protection from the winter cold.",
    eventDate: "2026-10-18",
    startTime: "09:00",
    endTime: "13:00",
    location: "Town Hall",
    city: "Kushtia",
    organizer: "Warm Hearts Initiative",
    organizerEmail: "warmhearts@example.com",
    joinedVolunteers: 41,
    imageUrl:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80",
    status: "completed",
  },
  {
    title: "Books for Bright Futures",
    category: "Education & Literacy",
    categoryId: "education",
    description:
      "Distributed books and educational materials to children from disadvantaged communities to encourage learning.",
    eventDate: "2026-10-22",
    startTime: "09:00",
    endTime: "13:00",
    location: "Kushtia Public Library",
    city: "Kushtia",
    organizer: "Education for All",
    organizerEmail: "educationforall@example.com",
    joinedVolunteers: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    status: "completed",
  },
  {
    title: "Free Health Checkup Camp",
    category: "Healthcare",
    categoryId: "healthcare",
    description:
      "Offered basic medical consultations, health screenings, and free medicines to people with limited healthcare access.",
    eventDate: "2026-10-25",
    startTime: "09:00",
    endTime: "16:00",
    location: "Community Center",
    city: "Kushtia",
    organizer: "Care Bangladesh",
    organizerEmail: "carebangladesh@example.com",
    joinedVolunteers: 38,
    imageUrl:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80",
    status: "completed",
  },
];

const CompletedEvent = () => {
  return (
    <section
      aria-labelledby="completed-events-heading"
      className="relative overflow-hidden bg-white px-[5%] py-16 text-[#142C45] transition-colors duration-300 sm:py-20 lg:py-24 dark:bg-[#111b27] dark:text-[#f6f7f2]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[12%] h-80 w-80 rounded-full bg-[#d9e9c5]/[0.08] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl border-t border-gray-200 pt-9 transition-colors sm:pt-11 dark:border-white/10">
        <div className="mb-8 flex flex-col gap-6 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#5d8338] uppercase dark:text-[#d9e9c5]">
              <span className="h-px w-6 bg-[#5d8338] dark:bg-[#d9e9c5]" />A little good goes a
              long way
            </p>
            <h2
              id="completed-events-heading"
              className="text-3xl leading-[1.04] font-extrabold tracking-[-0.045em] text-[#142C45] sm:text-4xl md:text-5xl dark:text-white"
            >
              Every act leaves
              <br className="hidden sm:block" /> a mark.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#142C45]/70 sm:text-base dark:text-white/55">
              These moments happened because people showed up for one another.
              Take a look at the good your community has already made possible.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {completed.map((event) => {
            const eventDate = new Date(event.eventDate);
            const formattedDate = Number.isNaN(eventDate.getTime())
              ? event.eventDate
              : new Intl.DateTimeFormat("en-BD", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }).format(eventDate);

            return (
              <article
                key={`${event.categoryId}-${event.eventDate}`}
                className="group relative overflow-hidden rounded-[1.4rem] border border-gray-200 bg-[#F7F6F0] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl dark:border-white/[0.09] dark:bg-[#192736] dark:hover:border-white/20 dark:shadow-[0_20px_60px_-35px_rgba(0,0,0,0.8)]"
              >
                <div className="relative h-52 overflow-hidden sm:h-56">
                  <Image
                    src={event.imageUrl}
                    alt={`${event.title} community event`}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#111b27]/35 via-transparent to-[#111b27]/65" />

                  <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
                    <span className="max-w-[65%] truncate rounded-full border border-white/15 bg-[#111b27]/50 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md">
                      {event.category}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#d9e9c5]/25 bg-[#182b26]/75 px-3 py-1.5 text-[10px] font-bold text-[#e2f1d2] backdrop-blur-md">
                      <FaCheck aria-hidden="true" className="text-[9px]" />
                      Completed
                    </span>
                  </div>

                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#111b27]/55 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
                    <FaCalendarDays
                      aria-hidden="true"
                      className="text-[#d9e9c5]"
                    />
                    {formattedDate}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="line-clamp-2 min-h-12 text-lg leading-6 font-bold tracking-tight text-[#142C45] transition-colors group-hover:text-[#254f38] dark:text-white dark:group-hover:text-[#d9e9c5]">
                    {event.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-[#142C45]/60 dark:text-white/50">
                    {event.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-200 pt-4 dark:border-white/10">
                    <span className="inline-flex min-w-0 items-center gap-2 text-xs text-[#142C45]/70 dark:text-white/65">
                      <FaLocationDot
                        aria-hidden="true"
                        className="shrink-0 text-[#5d8338] dark:text-[#d9e9c5]"
                      />
                      <span className="truncate">
                        {event.location}, {event.city}
                      </span>
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gray-200/60 px-2.5 py-1.5 text-[10px] font-semibold text-[#142C45] dark:bg-white/[0.06] dark:text-white/75">
                      <FaUsers aria-hidden="true" className="text-[#5d8338] dark:text-[#d9e9c5]" />
                      {event.joinedVolunteers}
                    </span>
                  </div>
                  <p className="mt-3 truncate text-[10px] text-[#142C45]/50 dark:text-white/35">
                    Organized by{" "}
                    <span className="font-medium text-[#142C45]/70 dark:text-white/55">
                      {event.organizer}
                    </span>
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-[#F7F6F0] p-5 sm:mt-8 sm:flex-row sm:items-center sm:px-7 sm:py-6 dark:border-white/10 dark:bg-gradient-to-r dark:from-[#1b3042] dark:to-[#192736]">
          <div>
            <p className="text-sm font-bold text-[#142C45] dark:text-white">
              The next good story could be yours.
            </p>
            <p className="mt-1 text-xs text-[#142C45]/60 dark:text-white/50">
              Find a community event and be part of what happens next.
            </p>
          </div>
          <Link
            href="/upcomming-events"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#142C45] px-5 py-3 text-xs font-bold text-white transition-all hover:bg-[#1e3d5f] focus-visible:ring-2 focus-visible:ring-[#142C45] focus-visible:outline-none dark:bg-[#d9e9c5] dark:text-[#21342b] dark:hover:bg-white dark:focus-visible:ring-white"
          >
            Explore events
            <FaArrowRight aria-hidden="true" className="text-[10px]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CompletedEvent;
