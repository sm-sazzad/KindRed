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

  const filteredEvents =
    selectedCategory === "all"
      ? events
      : events.filter((event) => event.categoryId === selectedCategory);

  return (
    <div className="col-span-full min-w-0">
      {/* Category Navigation */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`rounded-full cursor-pointer border px-4 py-2 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none ${
            selectedCategory === "all"
              ? "border-[#142C45] bg-[#142C45] text-white dark:border-[#d9e9c5]/30 dark:bg-[#d9e9c5] dark:text-[#203228]"
              : "border-gray-200 bg-gray-100 text-[#142C45]/70 hover:border-gray-300 hover:text-[#142C45] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60 dark:hover:border-white/25 dark:hover:text-white"
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
                : "border-gray-200 bg-gray-100 text-[#142C45]/70 hover:border-gray-300 hover:text-[#142C45] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60 dark:hover:border-white/25 dark:hover:text-white"
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
          <p className="text-lg font-semibold text-[#142C45] dark:text-white">No events found</p>
          <p className="mt-2 text-sm text-[#142C45]/60 dark:text-white/50">
            No events available in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default EventFilter;
