"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaHandHoldingHeart,
  FaRotateRight,
  FaTriangleExclamation,
} from "react-icons/fa6";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors for debugging
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="relative flex min-h-[calc(100vh-140px)] items-center justify-center overflow-hidden bg-[#F7F6F0] px-[5%] py-16 text-[#142C45] transition-colors duration-300 dark:bg-[#111b27] dark:text-[#f6f7f2]">
      {/* Background glow effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-rose-500/[0.08] blur-3xl dark:bg-rose-500/[0.05]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-1/4 h-80 w-80 rounded-full bg-[#142C45]/[0.05] blur-3xl dark:bg-[#d9e9c5]/[0.05]"
      />

      <div className="relative mx-auto max-w-xl text-center">
        {/* Decorative Badge & Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-rose-200 bg-white shadow-xl transition-transform duration-300 hover:rotate-6 dark:border-rose-500/20 dark:bg-[#192736]">
          <FaTriangleExclamation className="text-4xl text-rose-500 dark:text-rose-400" />
        </div>

        <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-rose-600 shadow-sm backdrop-blur-sm dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Something Went Wrong
        </p>

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#142C45] sm:text-4xl md:text-5xl dark:text-white">
          An unexpected error occurred
        </h1>

        <p className="mt-4 text-base leading-7 text-[#142C45]/70 sm:text-lg dark:text-white/60">
          We encountered an issue while loading this page. You can try refreshing
          the segment or go back to safety.
        </p>

        {error?.message && (
          <div className="mx-auto mt-4 max-w-md rounded-xl border border-rose-200 bg-white/70 px-4 py-3 text-xs text-rose-600 backdrop-blur dark:border-rose-500/20 dark:bg-[#192736]/80 dark:text-rose-300">
            <span className="font-semibold">Notice:</span> {error.message}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#142C45] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[#1e3d5f] hover:shadow-lg dark:bg-[#d9e9c5] dark:text-[#203242] dark:hover:bg-white"
          >
            <FaRotateRight className="text-xs" />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3.5 text-sm font-bold text-[#142C45] transition-all duration-300 hover:bg-gray-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/10"
          >
            <FaArrowLeft className="text-xs" />
            Back to Home
          </Link>
        </div>

        {/* Brand note */}
        <div className="mt-12 inline-flex items-center gap-2 text-xs text-[#142C45]/50 dark:text-white/40">
          <FaHandHoldingHeart className="text-sm text-[#5d8338] dark:text-[#d9e9c5]" />
          <span>Kindred · Together for change</span>
        </div>
      </div>
    </main>
  );
}

