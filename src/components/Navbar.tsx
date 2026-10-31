"use client";

import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import {
  FaArrowRightFromBracket,
  FaChevronDown,
  FaCalendarDays,
  FaHouse,
} from "react-icons/fa6";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

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
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#142C45]">
        <nav className="mx-auto flex w-[90%] max-w-7xl items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D9E9C5] transition-transform duration-300 group-hover:rotate-[-8deg]">
              <FaHandHoldingHeart className="text-xl text-[#142C45]" />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white">
                Kindred<span className="text-[#D9E9C5]">.</span>
              </h1>
              <p className="text-[9px] font-medium uppercase tracking-[2.5px] text-white/55">
                Together for change
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden items-center gap-9 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-[#D9E9C5] transition-colors hover:text-[#D9E9C5]"
            >
              Home
            </Link>

            <Link
              href="/upcomming-events"
              className="text-sm font-medium text-[#D9E9C5] transition-colors hover:text-white"
            >
              Upcoming Events
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {session.data?.user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  aria-label="Toggle profile menu"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="menu"
                  className="flex cursor-pointer items-center gap-2 rounded-full p-1.5 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9E9C5]"
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
                    className={`text-xs text-[#D9E9C5] transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full z-[70] mt-3 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#101b2c] text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                  >
                    <div className="border-b border-white/10 px-5 py-4">
                      <p className="truncate font-bold">
                        {session.data.user.name || "Kindred member"}
                      </p>
                      <p className="mt-1 truncate text-sm text-slate-400">
                        {session.data.user.email}
                      </p>
                    </div>

                    <div className="space-y-1 p-2">
                      <Link
                        href="/upcomming-events"
                        role="menuitem"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.07] hover:text-[#D9E9C5]"
                      >
                        <FaCalendarDays className="text-[#42d4bd]" />
                        Upcoming Events
                      </Link>
                      <Link
                        href="/"
                        role="menuitem"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.07] hover:text-[#D9E9C5]"
                      >
                        <FaHouse className="text-[#8b83ff]" />
                        Home
                      </Link>
                    </div>

                    <div className="border-t border-white/10 p-2">
                      <button
                        type="button"
                        role="menuitem"
                        onClick={async () => {
                          await authClient.signOut();
                          setIsProfileOpen(false);
                        }}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#ff7777] transition hover:bg-red-400/10"
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
                  className="text-sm font-semibold text-white transition-colors hover:text-[#D9E9C5]"
                >
                  Login
                </Link>

                <Link
                  href="/sign-up"
                  className="hidden items-center gap-2 rounded-full bg-[#D9E9C5] px-5 py-2.5 text-sm font-bold text-[#142C45] transition-all duration-300 hover:bg-white sm:flex"
                >
                  Join Us
                </Link>
              </>
            )}

            {/* Mobile Menu Icon */}
            <button
              onClick={handleToggleMenu}
              aria-label="Open navigation menu"
              className="text-2xl text-white md:hidden cursor-pointer"
            >
              <HiOutlineMenuAlt3 />
            </button>
          </div>
        </nav>
      </header>
      {/* sidebar */}
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
              className="rounded-full cursor-pointer bg-[#142C45]/5 p-2 text-[#142C45] transition hover:bg-[#142C45] hover:text-white"
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
                    : "text-[#142C45]/70 hover:bg-[#D9E9C5]/60 hov-[#142C45]"
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
