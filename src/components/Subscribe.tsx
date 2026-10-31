"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import {
  FaArrowRight,
  FaEnvelope,
  FaHeart,
  FaPeopleGroup,
} from "react-icons/fa6";
import { categories } from "./Category";
import CompletedEvent from "./CompletedEvent";

const impactHighlights = [
  {
    value: String(categories.length).padStart(2, "0"),
    label: "Causes to explore",
    detail: "Find the kind of help that feels right.",
  },
  {
    value: "Local",
    label: "People, real impact",
    detail: "Support the community around you.",
  },
  {
    value: "Open",
    label: "To everyone",
    detail: "There is a way for everyone to help.",
  },
  {
    value: "Together",
    label: "We go further",
    detail: "Small acts matter when we act as one.",
  },
] as const;

function NewsletterForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "Newsletter sign-ups are not connected yet. Please check back soon.",
    );
  }

  return (
    <form
      className="w-full max-w-xl"
      onSubmit={handleSubmit}
      aria-describedby="newsletter-message"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Your email address
      </label>
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-2 sm:flex-row sm:items-center sm:rounded-full">
        <div className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:pl-4">
          <FaEnvelope
            aria-hidden="true"
            className="shrink-0 text-sm text-white/40"
          />
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            required
            className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/40"
          />
        </div>
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#d9e9c5] px-5 py-3 text-sm font-bold text-[#1b2b26] transition-all duration-200 hover:bg-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#172b40] sm:rounded-full"
        >
          Subscribe <FaArrowRight aria-hidden="true" className="text-xs" />
        </button>
      </div>
      <p
        id="newsletter-message"
        aria-live="polite"
        className="mt-3 min-h-5 px-2 text-xs text-white/55"
      >
        {message || "A little good news, delivered occasionally. No spam."}
      </p>
    </form>
  );
}

const Subscribe = () => {
  return (
    <div className="overflow-hidden bg-[#111b27] px-[5%] pb-16 text-[#f6f7f2] sm:pb-20 lg:pb-24">
      <section
        aria-labelledby="community-impact-heading"
        className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#17314a] shadow-[0_30px_90px_-40px_rgba(0,0,0,0.8)] md:min-h-[520px] md:grid-cols-[1.12fr_0.88fr]"
      >
        <div className="flex flex-col justify-center p-6 sm:p-9 md:p-12 lg:p-14">
          <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#d9e9c5] uppercase">
            <FaHeart aria-hidden="true" className="text-[11px]" />
            Community impact
          </p>
          <h2
            id="community-impact-heading"
            className="max-w-xl text-3xl leading-[1.04] font-extrabold tracking-[-0.045em] text-white sm:text-4xl md:text-5xl"
          >
            Collective action moves further than solo effort.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-white/60 sm:text-base">
            Every helping hand makes a difference. Find a cause you care about,
            meet people who care too, and make your next small act count.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-x-5 gap-y-5 sm:mt-10 sm:gap-x-8 sm:gap-y-6">
            {impactHighlights.map((highlight) => (
              <div
                key={highlight.label}
                className="flex flex-col border-t border-white/15 pt-3 sm:pt-4"
              >
                <dt className="order-2 mt-1 text-xs font-bold text-[#d9e9c5] sm:text-sm">
                  {highlight.label}
                </dt>
                <dd className="order-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  {highlight.value}
                </dd>
                <p className="order-3 mt-1 text-[11px] leading-5 text-white/50 sm:text-xs">
                  {highlight.detail}
                </p>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4 sm:mt-8 sm:p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#d9e9c5]/10 text-[#d9e9c5]">
              <FaPeopleGroup aria-hidden="true" />
            </span>
            <p className="text-xs leading-5 text-white/70 sm:text-sm">
              You don&apos;t have to do everything. Just start with something
              kind.
            </p>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden sm:min-h-[440px] md:min-h-0">
          <Image
            src="/assests/comes.jpg"
            alt="Come as you are — everyone is welcome to make a difference"
            fill
            sizes="(max-width: 1024px) 90vw, 40vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#17314a]/20 via-[#17314a]/5 to-[#d9e9c5]/55 lg:bg-linear-to-r lg:from-[#17314a]/10 lg:via-transparent lg:to-[#d9e9c5]/35" />

          <div className="absolute right-4 bottom-4 left-4 rounded-2xl border border-white/20 bg-[#172b40]/75 p-4 shadow-xl backdrop-blur-md sm:right-6 sm:bottom-6 sm:left-6 sm:p-5">
            <p className="text-[9px] font-bold tracking-[0.17em] text-white/55 uppercase">
              Your next good thing
            </p>
            <p className="mt-1 flex items-center justify-between gap-3 text-base font-bold text-white sm:text-lg">
              Starts right where you are.
              <FaHeart
                aria-hidden="true"
                className="shrink-0 text-sm text-[#d9e9c5]"
              />
            </p>
          </div>
        </div>
      </section>

      <section>
        <CompletedEvent />
      </section>

      <section
        aria-labelledby="newsletter-heading"
        className="relative mx-auto mt-5 flex max-w-7xl flex-col gap-7 overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-[#1a3348] to-[#172638] p-6 sm:mt-6 sm:p-9 md:flex-row md:items-center md:justify-between md:gap-10 md:p-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-10 h-64 w-64 rounded-full bg-[#d9e9c5]/[0.07] blur-3xl"
        />
        <div className="relative max-w-lg">
          <p className="mb-3 text-[10px] font-bold tracking-[0.2em] text-[#d9e9c5] uppercase">
            Stay in the loop
          </p>
          <h2
            id="newsletter-heading"
            className="text-2xl leading-tight font-extrabold tracking-[-0.04em] text-white sm:text-3xl"
          >
            A little more good in your inbox.
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/55">
            Hear about meaningful events, local causes, and simple ways to show
            up for your community.
          </p>
        </div>
        <div className="relative md:min-w-[380px] md:flex-1 md:max-w-xl md:justify-items-end">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
};

export default Subscribe;
