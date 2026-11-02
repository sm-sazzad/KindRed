"use client";

import { useState } from "react";
import EventCard from "./EventCard";
import type { Event } from "./types";
import { categories } from "../Category";

interface EventFilterProps {
  events: Event[];
}

const EventFilter = ({ events }: EventFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  let filteredEvents = events;

  if (search.trim() !== "") {
    filteredEvents = events.filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase()),
    );
  } else if (selectedCategory !== "all") {
    filteredEvents = events.filter(
      (event) => event.categoryId === selectedCategory,
    );
  }

  return (
    <div className="col-span-full min-w-0">
      {/* Search Input Box */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search event by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs font-medium text-[#142C45] outline-none transition-colors placeholder:text-[#142C45]/45 focus:border-[#5d8338] focus:ring-2 focus:ring-[#5d8338]/20 dark:border-white/15 dark:bg-[#192736] dark:text-white dark:placeholder:text-white/40 dark:focus:border-[#d9e9c5] dark:focus:ring-[#d9e9c5]/20"
        />
      </div>

      {/* Category Navigation */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`rounded-full cursor-pointer border px-4 py-2 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none ${
            selectedCategory === "all"
              ? "border-[#142C45] bg-[#142C45] text-white dark:border-[#d9e9c5]/30 dark:bg-[#d9e9c5] dark:text-[#203228]"
              : "border-gray-200 bg-gray-100 text-[#142C45]/70 hover:border-gray-300 hover:text-[#142C45] dark:border-white/10 dark:bg-white/4 dark:text-white/60 dark:hover:border-white/25 dark:hover:text-white"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-full cursor-pointer border px-4 py-2 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none ${
              selectedCategory === category.id
                ? "border-[#142C45] bg-[#142C45] text-white dark:border-[#d9e9c5]/30 dark:bg-[#d9e9c5] dark:text-[#203228]"
                : "border-gray-200 bg-gray-100 text-[#142C45]/70 hover:border-gray-300 hover:text-[#142C45] dark:border-white/10 dark:bg-white/4 dark:text-white/60 dark:hover:border-white/25 dark:hover:text-white"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Filtered Events */}
      {filteredEvents.length > 0 ? (
        <div className="grid items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {filteredEvents.map((event, index) => (
            <EventCard key={event._id} event={event} index={index} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-lg font-semibold text-[#142C45] dark:text-white">
            No events found
          </p>
          <p className="mt-2 text-sm text-[#142C45]/60 dark:text-white/50">
            {search
              ? `No events matching "${search}".`
              : "No events available in this category."}
          </p>
        </div>
      )}
    </div>
  );
};

export default EventFilter;
