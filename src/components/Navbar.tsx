"use client";

import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import {
  FaArrowRightFromBracket,
  FaCircleCheck,
  FaCirclePlus,
  FaChevronDown,
  FaGear,
} from "react-icons/fa6";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const session = useSession();

  const handleToggleMenu = () => {
    setIsOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-[#142C45]">
        <nav className="mx-auto flex w-[90%] max-w-7xl items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D9E9C5] transition-transform duration-300 group-hover:rotate-[-8deg]">
              <FaHandHoldingHeart className="text-xl text-[#142C45]" />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#142C45] transition-colors dark:text-white">
                Kindred<span className="text-[#8CA875] dark:text-[#D9E9C5]">.</span>
              </h1>
              <p className="text-[9px] font-medium uppercase tracking-[2.5px] text-[#142C45]/60 transition-colors dark:text-white/55">
                Together for change
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden items-center gap-9 md:flex">
            <Link
              href="/"
              className={`text-sm font-semibold transition-colors ${
                pathname === "/"
                  ? "text-[#142C45] dark:text-[#D9E9C5]"
                  : "text-[#142C45]/70 hover:text-[#142C45] dark:text-white/70 dark:hover:text-white"
              }`}
            >
              Home
            </Link>

            <Link
              href="/upcomming-events"
              className={`text-sm font-semibold transition-colors ${
                pathname.startsWith("/upcomming-events")
                  ? "text-[#142C45] dark:text-[#D9E9C5]"
                  : "text-[#142C45]/70 hover:text-[#142C45] dark:text-white/70 dark:hover:text-white"
              }`}
            >
              Upcoming Events
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {session.data?.user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  aria-label="Toggle profile menu"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="menu"
                  className="flex cursor-pointer items-center gap-2 rounded-full p-1.5 transition hover:bg-gray-100 dark:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9E9C5]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#D9E9C5] bg-[#D9E9C5] text-sm font-bold text-[#142C45]">
                    {session.data.user.image ? (
                      <Image
                        src={session.data.user.image}
                        alt=""
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      session.data.user.name?.charAt(0).toUpperCase() || "U"
                    )}
                  </span>
                  <FaChevronDown
                    aria-hidden="true"
                    className={`text-xs text-[#142C45] transition-transform duration-200 dark:text-[#D9E9C5] ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full z-[70] mt-3 w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white text-[#142C45] shadow-[0_16px_40px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-[#101b2c] dark:text-white dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                  >
                    <div className="border-b border-gray-100 px-5 py-4 dark:border-white/10">
                      <p className="truncate font-bold">
                        {session.data.user.name || "Kindred member"}
                      </p>
                      <p className="mt-1 truncate text-sm text-gray-500 dark:text-slate-400">
                        {session.data.user.email}
                      </p>
                    </div>

                    <div className="space-y-1 p-2">
                      <Link
                        href="/create-event"
                        role="menuitem"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-[#142C45] dark:text-slate-200 dark:hover:bg-white/[0.07] dark:hover:text-[#D9E9C5]"
                      >
                        <FaCirclePlus className="text-[#0d9488] dark:text-[#42d4bd]" />
                        Create Event
                      </Link>
                      <Link
                        href="/manage-events"
                        role="menuitem"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-[#142C45] dark:text-slate-200 dark:hover:bg-white/[0.07] dark:hover:text-[#D9E9C5]"
                      >
                        <FaGear className="text-[#6366f1] dark:text-[#8b83ff]" />
                        Manage Events
                      </Link>
                      <Link
                        href="/joined-events"
                        role="menuitem"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-[#142C45] dark:text-slate-200 dark:hover:bg-white/[0.07] dark:hover:text-[#D9E9C5]"
                      >
                        <FaCircleCheck className="text-[#059669] dark:text-[#00c99a]" />
                        Joined Events
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 p-2 dark:border-white/10">
                      <button
                        type="button"
                        role="menuitem"
                        onClick={async () => {
                          try {
                            await authClient.signOut();
                            setIsProfileOpen(false);
                            toast.success("Signed out successfully!");
                          } catch {
                            toast.error(
                              "Failed to sign out. Please try again.",
                            );
                          }
                        }}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-[#ff7777] dark:hover:bg-red-400/10"
                      >
                        <FaArrowRightFromBracket />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-[#142C45] transition-colors hover:text-[#285789] dark:text-white dark:hover:text-[#D9E9C5]"
                >
                  Login
                </Link>

                <Link
                  href="/sign-up"
                  className="hidden items-center gap-2 rounded-full bg-[#D9E9C5] px-5 py-2.5 text-sm font-bold text-[#142C45] transition-all duration-300 hover:bg-[#cbe0b3] dark:hover:bg-white sm:flex"
                >
                  Join Us
                </Link>
              </>
            )}

            {/* Mobile Menu Icon */}
            <button
              onClick={handleToggleMenu}
              aria-label="Open navigation menu"
              className="cursor-pointer text-2xl text-[#142C45] dark:text-white md:hidden"
            >
              <HiOutlineMenuAlt3 />
            </button>
          </div>
        </nav>
      </header>

      {/* sidebar for mobile */}
      <div
        className={`fixed inset-0 z-[60] bg-[#0B1722]/50 backdrop-blur-sm transition-all duration-300 md:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <ul
          className={`absolute top-0 right-0 flex h-full w-72 flex-col gap-3 bg-[#F7F6F0] p-6 pt-5 text-[16px] font-semibold shadow-2xl transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-5 flex items-center justify-between border-b border-[#142C45]/10 pb-5">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#142C45]">
              Kindred<span className="text-[#8CA875]">.</span>
            </h2>

            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer rounded-full bg-[#142C45]/5 p-2 text-[#142C45] transition hover:bg-[#142C45] hover:text-white"
            >
              <RxCross2 className="text-xl" />
            </button>
          </div>

          <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-[2px] text-gray-400">
            Navigation
          </p>

          {[
            { name: "Home", href: "/" },
            { name: "Upcoming Events", href: "/upcomming-events" },
          ].map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-200 ${
                  isActive
                    ? "bg-[#142C45] text-[#D9E9C5] shadow-md"
                    : "text-[#142C45]/70 hover:bg-[#D9E9C5]/60 hover:text-[#142C45]"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="h-2 w-2 rounded-full bg-[#D9E9C5]" />
                )}
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
