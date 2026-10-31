"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  FaArrowRight,
  FaEnvelope,
  FaHandHoldingHeart,
  FaLock,
  FaUser,
} from "react-icons/fa6";
import { signIn, signUp } from "@/lib/auth-client";

type AuthFormProps = {
  mode: "login" | "sign-up";
};

const inputClassName =
  "w-full rounded-2xl border border-white/70 bg-[#e8eeeb] px-4 py-3.5 text-sm text-[#203242] shadow-[inset_4px_4px_9px_#cbd3cf,inset_-4px_-4px_9px_#fff] outline-none transition placeholder:text-[#89958f] focus:border-[#8ca875] focus:ring-2 focus:ring-[#8ca875]/20";

export default function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "sign-up";
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (isSignUp && password !== confirmPassword) {
      setErrorMessage("Your passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = isSignUp
        ? await signUp.email({ name, email, password, callbackURL: "/" })
        : await signIn.email({ email, password, callbackURL: "/" });

      if (result.error) {
        setErrorMessage(result.error.message || "Unable to authenticate. Please try again.");
        return;
      }

      router.push("/");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#e8eeeb] px-5 py-12 sm:px-8 lg:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-8 h-72 w-72 rounded-full bg-white/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 right-0 h-96 w-96 rounded-full bg-[#d9e9c5]/60 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-[#e8eeeb] shadow-[18px_18px_45px_#c9d0cd,-18px_-18px_45px_#fff] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-7 sm:p-10 lg:p-14">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-3 text-[#203242] sm:mb-12"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8eeeb] text-[#526d4e] shadow-[5px_5px_10px_#cbd3cf,-5px_-5px_10px_#fff]">
              <FaHandHoldingHeart aria-hidden="true" />
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              Kindred<span className="text-[#82996a]">.</span>
            </span>
          </Link>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#71816f]">
            {isSignUp ? "A little good starts here" : "Welcome back"}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#203242] sm:text-4xl">
            {isSignUp ? "Join your community." : "Good to see you again."}
          </h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#687770]">
            {isSignUp
              ? "Create an account to find your people and make a difference together."
              : "Sign in to pick up where you left off and keep making a difference."}
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {isSignUp && (
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-[#35483e]"
                >
                  Your name
                </label>
                <div className="relative">
                  <FaUser
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#829087]"
                  />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your full name"
                    className={`${inputClassName} pl-11`}
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#35483e]"
              >
                Email address
              </label>
              <div className="relative">
                <FaEnvelope
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#829087]"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className={`${inputClassName} pl-11`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#35483e]"
              >
                Password
              </label>
              <div className="relative">
                <FaLock
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#829087]"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  minLength={isSignUp ? 8 : undefined}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={isSignUp ? "At least 8 characters" : "Your password"}
                  className={`${inputClassName} pl-11`}
                />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-semibold text-[#35483e]"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <FaLock
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#829087]"
                  />
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Enter your password again"
                    className={`${inputClassName} pl-11`}
                  />
                </div>
              </div>
            )}

            {errorMessage && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#203242] px-5 py-4 text-sm font-bold text-white shadow-[6px_6px_12px_#c5cdca,-6px_-6px_12px_#fff] transition hover:bg-[#2d4658] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#82996a] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting
                ? "Please wait..."
                : isSignUp
                  ? "Create your account"
                  : "Sign in"}
              {!isSubmitting && (
                <FaArrowRight
                  aria-hidden="true"
                  className="text-xs transition-transform group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#687770]">
            {isSignUp ? "Already part of Kindred?" : "New to Kindred?"}{" "}
            <Link
              href={isSignUp ? "/login" : "/sign-up"}
              className="font-bold text-[#526d4e] underline decoration-[#526d4e]/30 underline-offset-4 transition hover:text-[#203242]"
            >
              {isSignUp ? "Sign in" : "Create an account"}
            </Link>
          </p>
        </div>

        <aside className="relative hidden min-h-[620px] flex-col justify-between overflow-hidden bg-[#d9e9c5] p-10 text-[#203242] lg:flex lg:p-12">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-20 h-80 w-80 rounded-full border-[40px] border-white/30"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full border-[36px] border-[#9fb58a]/25"
          />
          <div className="relative">
            <span className="inline-flex rounded-full bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#526d4e] shadow-[4px_4px_10px_#b8c8a9,-4px_-4px_10px_#fafff0]">
              Together for change
            </span>
          </div>

          <div className="relative">
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-[#d9e9c5] text-4xl text-[#526d4e] shadow-[10px_10px_22px_#b8c8a9,-10px_-10px_22px_#fafff0]">
              <FaHandHoldingHeart aria-hidden="true" />
            </div>
            <h2 className="max-w-sm text-4xl font-extrabold leading-tight tracking-tight">
              Small acts. Real change.
            </h2>
            <p className="mt-4 max-w-sm leading-7 text-[#526353]">
              Meet the people and causes that make your neighborhood feel a
              little more like home.
            </p>
            <div className="mt-9 rounded-2xl bg-[#d9e9c5]/70 p-5 shadow-[inset_5px_5px_12px_#b8c8a9,inset_-5px_-5px_12px_#fafff0]">
              <p className="text-sm font-semibold leading-6 text-[#435340]">
                “Kindness grows when we make room for each other.”
              </p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-[#71816f]">
                The Kindred community
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
