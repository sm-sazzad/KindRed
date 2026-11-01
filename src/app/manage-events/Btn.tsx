"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaTrash, FaXmark } from "react-icons/fa6";
import { FaPenToSquare } from "react-icons/fa6";
import { categories } from "@/components/Category";
import type { Event } from "@/components/events/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Btn = ({ event }: { event: Event }) => {
  const [dialog, setDialog] = useState<"edit" | "delete" | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());

    setIsPending(true);
    setErrorMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${event._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        },
      );

      if (!res.ok) {
        throw new Error("Could not update the event. Please try again.");
      }

      const resData = await res.json();
      if (resData.modifiedCount > 0) {
        toast.success("Event updated successfully!");
        router.refresh();
        setDialog(null);
      } else {
        const msg = "No changes were saved. Please try again.";
        setErrorMessage(msg);
        toast.error(msg);
      }
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Could not update the event.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async () => {
    setIsPending(true);
    setErrorMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${event._id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error("Could not delete the event. Please try again.");
      }

      const resData = await res.json();
      if (resData.deletedCount > 0) {
        toast.success("Event deleted successfully!");
        router.refresh();
        setDialog(null);
      } else {
        const msg = "The event was not deleted. Please try again.";
        setErrorMessage(msg);
        toast.error(msg);
      }
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Could not delete the event.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
        <Link
          href={`/upcomming-events/${event._id}`}
          className="inline-flex cursor-pointer items-center justify-center gap-1 rounded-lg bg-[#d9e9c5] px-2 py-2.5 text-xs font-bold text-[#203242] transition hover:bg-white"
        >
          View <FaArrowRight aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={() => {
            setErrorMessage("");
            setDialog("edit");
          }}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10"
        >
          <FaPenToSquare />
          Edit
        </button>

        <button
          type="button"
          onClick={() => {
            setErrorMessage("");
            setDialog("delete");
          }}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-300/15 bg-red-400/[0.08] px-3 py-2.5 text-xs font-semibold text-red-200 transition hover:bg-red-400/15"
        >
          <FaTrash />
          Delete
        </button>
      </div>

      {dialog && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#07111c]/80 p-4 backdrop-blur-sm"
          onMouseDown={(click) => {
            if (click.target === click.currentTarget) setDialog(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-dialog-title"
            className="my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#192736] text-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-white/10 px-5 py-5 sm:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d9e9c5]">
                  {dialog === "edit" ? "Event details" : "Please confirm"}
                </p>
                <h2 id="event-dialog-title" className="mt-1 text-xl font-bold">
                  {dialog === "edit" ? "Edit event" : "Delete this event?"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setDialog(null)}
                disabled={isPending}
                aria-label="Close dialog"
                className="rounded-lg p-2 cursor-pointer text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <FaXmark />
              </button>
            </div>

            {dialog === "edit" ? (
              <form
                onSubmit={handleEdit}
                className="max-h-[70vh] overflow-y-auto p-5 sm:p-7"
              >
                {errorMessage && (
                  <p
                    role="alert"
                    className="mb-5 rounded-xl border border-red-300/15 bg-red-300/[0.06] px-4 py-3 text-sm text-red-200"
                  >
                    {errorMessage}
                  </p>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium text-white/75">
                    Title
                    <input
                      name="title"
                      defaultValue={event.title}
                      placeholder="Event title"
                      className={inputClass}
                    />
                  </label>
                  <label className="text-sm font-medium text-white/75">
                    Category
                    <select
                      name="category"
                      defaultValue={
                        event.categoryId ||
                        categories.find((item) => item.name === event.category)
                          ?.id ||
                        ""
                      }
                      className={inputClass}
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
                  <label className="text-sm font-medium text-white/75 sm:col-span-2">
                    Description
                    <textarea
                      name="description"
                      defaultValue={event.description}
                      placeholder="Describe the event"
                      rows={3}
                      className={inputClass}
                    />
                  </label>
                  <label className="text-sm font-medium text-white/75">
                    Event date
                    <input
                      name="eventDate"
                      type="date"
                      min={new Date().toLocaleDateString("en-CA")}
                      defaultValue={event.eventDate?.slice(0, 10)}
                      className={inputClass}
                    />
                  </label>
                  <label className="text-sm font-medium text-white/75">
                    Start time
                    <input
                      name="startTime"
                      type="time"
                      defaultValue={event.startTime}
                      className={inputClass}
                    />
                  </label>
                  <label className="text-sm font-medium text-white/75">
                    End time
                    <input
                      name="endTime"
                      type="time"
                      defaultValue={event.endTime}
                      className={inputClass}
                    />
                  </label>
                  <label className="text-sm font-medium text-white/75">
                    Location
                    <input
                      name="location"
                      defaultValue={event.location}
                      placeholder="Event location"
                      className={inputClass}
                    />
                  </label>
                  <label className="text-sm font-medium text-white/75">
                    City
                    <input
                      name="city"
                      defaultValue={event.city}
                      placeholder="City"
                      className={inputClass}
                    />
                  </label>
                  <label className="text-sm font-medium text-white/75">
                    Organizer
                    <input
                      name="organizer"
                      defaultValue={event.organizer}
                      placeholder="Organizer name"
                      className={inputClass}
                    />
                  </label>
                  <label className="text-sm font-medium text-white/75">
                    Organizer email
                    <input
                      name="organizerEmail"
                      type="email"
                      defaultValue={event.organizerEmail}
                      placeholder="name@example.com"
                      className={inputClass}
                    />
                  </label>
                  <label className="text-sm font-medium text-white/75 sm:col-span-2">
                    Image URL
                    <input
                      name="imageUrl"
                      type="url"
                      defaultValue={event.imageUrl}
                      placeholder="https://example.com/image.jpg"
                      className={inputClass}
                    />
                  </label>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-xl cursor-pointer bg-[#d9e9c5] px-5 py-3 text-sm font-bold text-[#203242] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isPending ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-5 sm:p-7">
                {errorMessage && (
                  <p
                    role="alert"
                    className="mb-5 rounded-xl border border-red-300/15 bg-red-300/[0.06] px-4 py-3 text-sm text-red-200"
                  >
                    {errorMessage}
                  </p>
                )}
                <p className="text-sm leading-6 text-white/65">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-white">
                    {event.title}
                  </span>
                  ?
                </p>
                <div className="mt-6 flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setDialog(null)}
                    disabled={isPending}
                    className="rounded-xl cursor-pointer border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/[0.06]"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isPending}
                    className="rounded-xl cursor-pointer border border-white/10 px-5 py-3 text-sm font-bold text-red-300 transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isPending ? "Deleting..." : "Delete event"}
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
};

const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-[#111b27] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#d9e9c5]/60 focus:ring-2 focus:ring-[#d9e9c5]/10";

export default Btn;
