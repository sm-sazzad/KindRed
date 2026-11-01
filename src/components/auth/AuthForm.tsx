"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  FaArrowRight,
  FaEnvelope,
  FaGoogle,
  FaHandHoldingHeart,
  FaImage,
  FaLock,
  FaUser,
} from "react-icons/fa6";
import { signIn, signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";

type AuthFormProps = {
  mode: "login" | "sign-up";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "sign-up";
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || (resolvedTheme || theme) === "dark";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const inputClassName = isDark
    ? "w-full rounded-2xl border border-white/10 bg-[#111b27] px-4 py-3.5 text-sm text-white shadow-[inset_3px_3px_8px_rgba(0,0,0,0.5),inset_-2px_-2px_6px_rgba(255,255,255,0.03)] outline-none transition placeholder:text-white/35 focus:border-[#d9e9c5]/60 focus:ring-2 focus:ring-[#d9e9c5]/20"
    : "w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-[#142C45] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] outline-none transition placeholder:text-gray-400 focus:border-[#142C45]/60 focus:ring-2 focus:ring-[#142C45]/10";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (password.length < 6) {
      const msg = "Password must be at least 6 characters long.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      const msg = "Password must contain at least one uppercase letter.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    if (!/[a-z]/.test(password)) {
      const msg = "Password must contain at least one lowercase letter.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      const msg = "Your passwords do not match.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = isSignUp
        ? await signUp.email({
            name,
            email,
            password,
            image: image.trim() || undefined,
            callbackURL: "/",
          })
        : await signIn.email({
            email,
            password,
            callbackURL: "/",
          });

      if (result.error) {
        const errorMsg =
          result.error.message || "Unable to authenticate. Please try again.";
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
        return;
      }

      toast.success(
        isSignUp ? "Account created successfully!" : "Signed in successfully!",
      );
      router.push("/");
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className={`relative isolate min-h-[85vh] flex items-center justify-center overflow-hidden px-5 py-12 transition-colors duration-300 sm:px-8 lg:py-16 ${
        isDark ? "bg-[#111b27]" : "bg-[#F7F6F0]"
      }`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -left-28 top-8 h-72 w-72 rounded-full blur-3xl ${
          isDark ? "bg-[#1a344b]/60" : "bg-white/80"
        }`}
      />

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-36 right-0 h-96 w-96 rounded-full blur-3xl ${
          isDark ? "bg-[#d9e9c5]/10" : "bg-[#d9e9c5]/40"
        }`}
      />

      <div
        className={`relative mx-auto grid max-w-6xl w-full overflow-hidden rounded-[2rem] transition-colors duration-300 ${
          isDark
            ? "border border-white/10 bg-[#192736] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
            : "border border-gray-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
        } lg:grid-cols-[1.05fr_0.95fr]`}
      >
        <div className="p-7 sm:p-10 lg:p-14">
          <Link
            href="/"
            className="group mb-10 inline-flex items-center gap-3 transition-colors sm:mb-12"
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl transition-transform duration-300 group-hover:rotate-[-8deg] ${
                isDark
                  ? "border border-white/10 bg-[#111b27] text-[#d9e9c5] shadow-[4px_4px_10px_rgba(0,0,0,0.4)]"
                  : "border border-gray-200 bg-gray-100 text-[#142C45] shadow-sm"
              }`}
            >
              <FaHandHoldingHeart aria-hidden="true" />
            </span>

            <span
              className={`text-xl font-extrabold tracking-tight transition-colors ${
                isDark ? "text-white" : "text-[#142C45]"
              }`}
            >
              Kindred
              <span className={isDark ? "text-[#d9e9c5]" : "text-[#8CA875]"}>
                .
              </span>
            </span>
          </Link>

          <p
            className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
              isDark ? "text-[#d9e9c5]" : "text-[#526d4e]"
            }`}
          >
            {isSignUp ? "A little good starts here" : "Welcome back"}
          </p>

          <h1
            className={`mt-3 text-3xl font-extrabold tracking-tight transition-colors sm:text-4xl ${
              isDark ? "text-white" : "text-[#142C45]"
            }`}
          >
            {isSignUp ? "Join your community." : "Good to see you again."}
          </h1>

          <p
            className={`mt-3 max-w-md text-sm leading-6 transition-colors ${
              isDark ? "text-white/60" : "text-gray-600"
            }`}
          >
            {isSignUp
              ? "Create an account to find your people and make a difference together."
              : "Sign in to pick up where you left off and keep making a difference."}
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {/* Google Sign In */}
            <button
              type="button"
              onClick={async () => {
                try {
                  await signIn.social({
                    provider: "google",
                    callbackURL: "/",
                  });
                } catch {
                  toast.error("Failed to connect with Google.");
                }
              }}
              className={`flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border px-5 py-4 text-sm font-bold transition ${
                isDark
                  ? "border-white/10 bg-[#111b27] text-white shadow-[4px_4px_10px_rgba(0,0,0,0.3)] hover:bg-white/10 hover:border-white/20"
                  : "border-gray-200 bg-gray-50 text-[#142C45] shadow-sm hover:bg-gray-100"
              }`}
            >
              <FaGoogle />
              {isSignUp ? "Sign up with Google" : "Sign in with Google"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div
                className={`h-px flex-1 ${
                  isDark ? "bg-white/10" : "bg-gray-200"
                }`}
              />
              <span
                className={`text-xs ${
                  isDark ? "text-white/40" : "text-gray-400"
                }`}
              >
                OR
              </span>
              <div
                className={`h-px flex-1 ${
                  isDark ? "bg-white/10" : "bg-gray-200"
                }`}
              />
            </div>

            {isSignUp && (
              <div>
                <label
                  htmlFor="name"
                  className={`mb-2 block text-sm font-semibold transition-colors ${
                    isDark ? "text-white/80" : "text-gray-700"
                  }`}
                >
                  Your name
                </label>

                <div className="relative">
                  <FaUser
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm ${
                      isDark ? "text-white/40" : "text-gray-400"
                    }`}
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
                className={`mb-2 block text-sm font-semibold transition-colors ${
                  isDark ? "text-white/80" : "text-gray-700"
                }`}
              >
                Email address
              </label>

              <div className="relative">
                <FaEnvelope
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm ${
                    isDark ? "text-white/40" : "text-gray-400"
                  }`}
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

            {isSignUp && (
              <div>
                <label
                  htmlFor="image"
                  className={`mb-2 block text-sm font-semibold transition-colors ${
                    isDark ? "text-white/80" : "text-gray-700"
                  }`}
                >
                  Profile image URL
                </label>

                <div className="relative">
                  <FaImage
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm ${
                      isDark ? "text-white/40" : "text-gray-400"
                    }`}
                  />

                  <input
                    id="image"
                    name="image"
                    type="url"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                    placeholder="https://example.com/your-photo.jpg"
                    className={`${inputClassName} pl-11`}
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className={`mb-2 block text-sm font-semibold transition-colors ${
                  isDark ? "text-white/80" : "text-gray-700"
                }`}
              >
                Password
              </label>

              <div className="relative">
                <FaLock
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm ${
                    isDark ? "text-white/40" : "text-gray-400"
                  }`}
                />

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  minLength={isSignUp ? 6 : undefined}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={
                    isSignUp
                      ? "At least 6 characters, including 1 uppercase and 1 lowercase letter."
                      : "Your password"
                  }
                  className={`${inputClassName} pl-11`}
                />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label
                  htmlFor="confirm-password"
                  className={`mb-2 block text-sm font-semibold transition-colors ${
                    isDark ? "text-white/80" : "text-gray-700"
                  }`}
                >
                  Confirm password
                </label>

                <div className="relative">
                  <FaLock
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm ${
                      isDark ? "text-white/40" : "text-gray-400"
                    }`}
                  />

                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    minLength={6}
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
                className={`rounded-xl border px-4 py-3 text-sm ${
                  isDark
                    ? "border-red-300/15 bg-red-300/[0.06] text-red-200"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`group flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70 ${
                isDark
                  ? "bg-[#d9e9c5] text-[#142C45] shadow-[0_10px_25px_-5px_rgba(217,233,197,0.3)] hover:bg-white focus-visible:outline-[#d9e9c5]"
                  : "bg-[#142C45] text-white shadow-md hover:bg-[#1f3f61] focus-visible:outline-[#142C45]"
              }`}
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

          <p
            className={`mt-7 text-center text-sm transition-colors ${
              isDark ? "text-white/50" : "text-gray-600"
            }`}
          >
            {isSignUp ? "Already part of Kindred?" : "New to Kindred?"}{" "}
            <Link
              href={isSignUp ? "/login" : "/sign-up"}
              className={`font-bold underline underline-offset-4 transition ${
                isDark
                  ? "text-[#d9e9c5] decoration-[#d9e9c5]/30 hover:text-white"
                  : "text-[#142C45] decoration-[#142C45]/30 hover:text-black"
              }`}
            >
              {isSignUp ? "Sign in" : "Create an account"}
            </Link>
          </p>
        </div>

        <aside
          className={`relative hidden min-h-[620px] flex-col justify-between overflow-hidden bg-[#d9e9c5] p-10 text-[#203242] lg:flex lg:p-12 ${
            isDark ? "border-l border-white/10" : "border-l border-gray-200"
          }`}
        >
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
