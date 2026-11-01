"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-11 w-11" />;
  }

  const isDark = (resolvedTheme || theme) === "dark";

  const handleToggle = () => {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    if (typeof document !== "undefined") {
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`flex cursor-pointer h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
        isDark
          ? "border-[#D9E9C5]/20 bg-[#1B2937] text-[#D9E9C5] hover:bg-[#D9E9C5] hover:text-[#142C45]"
          : "border-gray-200 bg-gray-100 text-[#142C45] hover:bg-gray-200"
      }`}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {isDark ? (
        <IoSunny className="text-xl text-[#D9E9C5]" />
      ) : (
        <FaMoon className="text-lg text-[#142C45]" />
      )}
    </button>
  );
}
