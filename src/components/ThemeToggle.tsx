"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-11 w-11" />;
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-[#142C45] transition-all duration-300 hover:bg-gray-200 dark:border-[#D9E9C5]/20 dark:bg-[#1B2937] dark:text-[#D9E9C5] dark:hover:bg-[#D9E9C5] dark:hover:text-[#142C45]"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <IoSunny className="hidden text-xl text-[#ddea25] dark:block" />
      <FaMoon className="block text-lg text-[#142C45] dark:hidden" />
    </button>
  );
}
