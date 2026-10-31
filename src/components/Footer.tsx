import Link from "next/link";
import { FaArrowRight, FaArrowUp, FaHandHoldingHeart, FaHeart } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#0d1620] text-[#f6f7f2]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-[#d9e9c5]/[0.035] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="flex flex-col gap-8 border-b border-white/10 py-9 sm:flex-row sm:items-center sm:justify-between sm:py-11">
          <div className="max-w-xl">
            <p className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Have a little good in mind?
            </p>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Find a cause, meet your community, and make your next small act
              count.
            </p>
          </div>
          <Link
            href="/upcomming-events"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#d9e9c5] px-5 py-3 text-sm font-bold text-[#1d3028] transition-all hover:bg-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            Find an event
            <FaArrowRight
              aria-hidden="true"
              className="text-xs transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="grid gap-10 py-9 sm:grid-cols-2 sm:py-11 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:gap-16">
          <div className="max-w-sm">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d9e9c5] text-[#172a39] transition-transform duration-300 group-hover:-rotate-6">
                <FaHandHoldingHeart aria-hidden="true" className="text-lg" />
              </span>
              <span>
                <span className="block text-xl font-extrabold tracking-tight text-white">
                  Kindred<span className="text-[#d9e9c5]">.</span>
                </span>
                <span className="mt-0.5 block text-[9px] font-medium tracking-[0.2em] text-white/45 uppercase">
                  Together for change
                </span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-6 text-white/50">
              A community for people who believe kindness can turn into
              meaningful change.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-xs font-bold tracking-[0.16em] text-white/80 uppercase">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-white/50 transition-colors hover:text-[#d9e9c5]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/upcomming-events"
                  className="text-sm text-white/50 transition-colors hover:text-[#d9e9c5]"
                >
                  Upcoming events
                </Link>
              </li>
              <li>
                <Link
                  href="/#causes"
                  className="text-sm text-white/50 transition-colors hover:text-[#d9e9c5]"
                >
                  Find a cause
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Get involved">
            <h2 className="text-xs font-bold tracking-[0.16em] text-white/80 uppercase">
              Get involved
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/login"
                  className="text-sm text-white/50 transition-colors hover:text-[#d9e9c5]"
                >
                  Join the community
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-white/50 transition-colors hover:text-[#d9e9c5]"
                >
                  Create an event
                </Link>
              </li>
              <li>
                <Link
                  href="/#newsletter-heading"
                  className="text-sm text-white/50 transition-colors hover:text-[#d9e9c5]"
                >
                  Get community updates
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Kindred. Made with{" "}
            <FaHeart
              aria-label="love"
              className="mx-0.5 inline text-[10px] text-[#d9e9c5]"
            />{" "}
            for kinder communities.
          </p>
          <Link
            href="/"
            className="group inline-flex w-fit items-center gap-2 transition-colors hover:text-[#d9e9c5]"
          >
            Back to home
            <FaArrowUp
              aria-hidden="true"
              className="text-[10px] transition-transform group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
