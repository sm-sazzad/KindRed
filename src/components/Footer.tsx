import Link from "next/link";
import {
  FaArrowRight,
  FaArrowUp,
  FaFacebook,
  FaGithub,
  FaGlobe,
  FaHandHoldingHeart,
  FaHeart,
  FaLinkedin,
} from "react-icons/fa6";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/sm-sazzad",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/sm-sazzad/",
    icon: FaLinkedin,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sazzad.hossain.5758",
    icon: FaFacebook,
  },
  {
    name: "Portfolio",
    href: "https://sazzad-dev.vercel.app/",
    icon: FaGlobe,
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-gray-200 bg-gray-50 text-[#142C45] transition-colors duration-300 dark:border-white/[0.08] dark:bg-[#0d1620] dark:text-[#f6f7f2]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-[#d9e9c5]/[0.08] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="flex flex-col gap-8 border-b border-gray-200 py-9 transition-colors sm:flex-row sm:items-center sm:justify-between sm:py-11 dark:border-white/10">
          <div className="max-w-xl">
            <p className="text-xl font-bold tracking-tight text-[#142C45] sm:text-2xl dark:text-white">
              Have a little good in mind?
            </p>
            <p className="mt-2 text-sm leading-6 text-[#142C45]/70 dark:text-white/50">
              Find a cause, meet your community, and make your next small act
              count.
            </p>
          </div>
          <Link
            href="/upcomming-events"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#142C45] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-[#1e3d5f] focus-visible:ring-2 focus-visible:ring-[#142C45] focus-visible:outline-none dark:bg-[#d9e9c5] dark:text-[#1d3028] dark:hover:bg-white dark:focus-visible:ring-white"
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
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d9e9c5] text-[#142C45] transition-transform duration-300 group-hover:-rotate-6">
                <FaHandHoldingHeart aria-hidden="true" className="text-lg" />
              </span>
              <span>
                <span className="block text-xl font-extrabold tracking-tight text-[#142C45] dark:text-white">
                  Kindred
                  <span className="text-[#5d8338] dark:text-[#d9e9c5]">.</span>
                </span>
                <span className="mt-0.5 block text-[9px] font-medium tracking-[0.2em] text-[#142C45]/60 uppercase dark:text-white/45">
                  Together for change
                </span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-6 text-[#142C45]/70 dark:text-white/50">
              A community for people who believe kindness can turn into
              meaningful change.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-xs font-bold tracking-[0.16em] text-[#142C45] uppercase dark:text-white/80">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-[#142C45]/70 transition-colors hover:text-[#5d8338] dark:text-white/50 dark:hover:text-[#d9e9c5]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/upcomming-events"
                  className="text-sm text-[#142C45]/70 transition-colors hover:text-[#5d8338] dark:text-white/50 dark:hover:text-[#d9e9c5]"
                >
                  Upcoming events
                </Link>
              </li>
              <li>
                <Link
                  href="/#causes"
                  className="text-sm text-[#142C45]/70 transition-colors hover:text-[#5d8338] dark:text-white/50 dark:hover:text-[#d9e9c5]"
                >
                  Find a cause
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold tracking-[0.16em] text-[#142C45] uppercase dark:text-white/80">
              Follow Us
            </h2>
            <ul className="mt-4 space-y-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 text-sm text-[#142C45]/70 transition-colors hover:text-[#5d8338] dark:text-white/50 dark:hover:text-[#d9e9c5]"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white text-[#142C45] transition-transform duration-200 group-hover:scale-110 group-hover:border-[#5d8338] dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:group-hover:border-[#d9e9c5] dark:group-hover:text-[#d9e9c5]">
                        <Icon className="text-sm" />
                      </span>
                      <span>{item.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-200 py-5 text-xs text-[#142C45]/60 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:text-white/40">
          <p>
            © {new Date().getFullYear()} Kindred. Made with{" "}
            <FaHeart
              aria-label="love"
              className="mx-0.5 inline text-[10px] text-rose-500 dark:text-[#d9e9c5]"
            />{" "}
            for kinder communities.
          </p>
          <Link
            href="/"
            className="group inline-flex w-fit items-center gap-2 transition-colors hover:text-[#142C45] dark:hover:text-[#d9e9c5]"
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
