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
          className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[#d9e9c5] focus-visible:outline-none ${
            selectedCategory === "all"
              ? "border-[#d9e9c5]/30 bg-[#d9e9c5] text-[#203228]"
              : "border-white/10 bg-white/[0.04] text-white/60 hover:border-white/25 hover:text-white"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[#d9e9c5] focus-visible:outline-none ${
              selectedCategory === category.id
                ? "border-[#d9e9c5]/30 bg-[#d9e9c5] text-[#203228]"
                : "border-white/10 bg-white/[0.04] text-white/60 hover:border-white/25 hover:text-white"
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
          <p className="text-lg font-semibold text-white">
            No events found
          </p>
          <p className="mt-2 text-sm text-white/50">
            No events available in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default EventFilter;
