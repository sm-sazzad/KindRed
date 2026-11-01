"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaCalendarDays } from "react-icons/fa6";
import { categories } from "@/components/Category";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-[#111b27] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#d9e9c5]/60 focus:ring-2 focus:ring-[#d9e9c5]/10";

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const session = useSession();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const category = categories.find(
      (item) => item.id === formData.get("category"),
    );

    if (!category) {
      setErrorMessage("Please select a category.");
      toast.error("Please select a category.");
      setIsSubmitting(false);
      return;
    }

    const eventDetails = {
      email: session.data?.user.email,
      title: formData.get("title"),
      category: category.name,
      categoryId: category.id,
      description: formData.get("description"),
      eventDate: formData.get("eventDate"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
      location: formData.get("location"),
      city: formData.get("city"),
      organizer: formData.get("organizer"),
      organizerEmail: formData.get("organizerEmail"),
      imageUrl: formData.get("imageUrl"),
      createdAt: new Date(),
      status: "upcoming",
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventDetails),
      });

      if (!response.ok) {
        throw new Error("Could not create the event. Please try again.");
      }

      toast.success("Event created successfully!");
      router.push("/upcomming-events");
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#111b27] px-[5%] py-12 text-[#f6f7f2] sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d9e9c5] text-lg text-[#203242]">
            <FaCalendarDays aria-hidden="true" />
          </span>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#d9e9c5]/70">
            Bring your community together
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Create an event
          </h1>
          <p className="mt-2 text-sm text-white/55">
            Share the details and invite people to make a difference with you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-[#192736] p-5 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.8)] sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-white/80">
              Event title
              <input
                className={inputClass}
                name="title"
                placeholder="Give your event a name"
                required
              />
            </label>

            <label className="text-sm font-semibold text-white/80">
              Category
              <select
                className={inputClass}
                name="category"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Choose a category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-semibold text-white/80 sm:col-span-2">
              Description
              <textarea
                className={`${inputClass} min-h-32 resize-y`}
                name="description"
                placeholder="Tell people what the event is about"
                required
              />
            </label>

            <label className="text-sm font-semibold text-white/80">
              Event date
              <input
                className={inputClass}
                name="eventDate"
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                required
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm font-semibold text-white/80">
                Start time
                <input
                  className={inputClass}
                  name="startTime"
                  type="time"
                  required
                />
              </label>
              <label className="text-sm font-semibold text-white/80">
                End time
                <input
                  className={inputClass}
                  name="endTime"
                  type="time"
                  required
                />
              </label>
            </div>

            <label className="text-sm font-semibold text-white/80">
              Location
              <input
                className={inputClass}
                name="location"
                placeholder="Venue or meeting point"
                required
              />
            </label>
            <label className="text-sm font-semibold text-white/80">
              City
              <input
                className={inputClass}
                name="city"
                placeholder="City"
                required
              />
            </label>

            <label className="text-sm font-semibold text-white/80">
              Organizer
              <input
                className={inputClass}
                name="organizer"
                placeholder="Organizer name"
                required
              />
            </label>
            <label className="text-sm font-semibold text-white/80">
              Organizer email
              <input
                className={inputClass}
                name="organizerEmail"
                type="email"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="text-sm font-semibold text-white/80 sm:col-span-2">
              Image URL
              <input
                className={inputClass}
                name="imageUrl"
                type="url"
                placeholder="https://example.com/event-image.jpg"
                required
              />
            </label>
          </div>

          {errorMessage && (
            <p
              role="alert"
              className="mt-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
            >
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d9e9c5] px-5 py-3.5 text-sm font-bold text-[#203242] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9e9c5] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? "Creating event..." : "Create event"}
            {!isSubmitting && (
              <FaArrowRight aria-hidden="true" className="text-xs" />
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
