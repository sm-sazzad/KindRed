"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaTrash, FaXmark } from "react-icons/fa6";
import { FaPenToSquare } from "react-icons/fa6";
import { categories } from "@/components/Category";
import type { Event } from "@/components/events/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getTokenClient } from "@/lib/AccessTokenClient";

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
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${await getTokenClient()}`,
          },
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
          headers: {
            authorization: `Bearer ${await getTokenClient()}`,
          },
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
      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-gray-200 pt-4 dark:border-white/10">
        <Link
          href={`/upcomming-events/${event._id}`}
          className="inline-flex cursor-pointer items-center justify-center gap-1 rounded-lg bg-[#142C45] px-2 py-2.5 text-xs font-bold text-white transition hover:bg-[#1e3d5f] dark:bg-[#d9e9c5] dark:text-[#203242] dark:hover:bg-white"
        >
          View <FaArrowRight aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={() => {
            setErrorMessage("");
            setDialog("edit");
          }}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5 text-xs font-semibold text-[#142C45] transition hover:bg-gray-200 dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/10"
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
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-300/15 dark:bg-red-400/[0.08] dark:text-red-200 dark:hover:bg-red-400/15"
        >
          <FaTrash />
          Delete
        </button>
      </div>

      {dialog && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
          onMouseDown={(click) => {
            if (click.target === click.currentTarget) setDialog(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-dialog-title"
            className="my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white text-[#142C45] shadow-2xl dark:border-white/10 dark:bg-[#192736] dark:text-white"
          >
            <div className="flex items-start justify-between border-b border-gray-200 px-5 py-5 sm:px-7 dark:border-white/10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#5d8338] dark:text-[#d9e9c5]">
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
                className="cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#142C45] dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
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
                    className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-300/15 dark:bg-red-300/[0.06] dark:text-red-200"
                  >
                    {errorMessage}
                  </p>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium text-[#142C45]/80 dark:text-white/75">
                    Title
                    <input
                      name="title"
                      defaultValue={event.title}
                      placeholder="Event title"
                      className={inputClass}
                    />
                  </label>
                  <label className="text-sm font-medium text-[#142C45]/80 dark:text-white/75">
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
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm font-medium text-[#142C45]/80 sm:col-span-2 dark:text-white/75">
                    Description
                    <textarea
                      name="description"
                      defaultValue={event.description}
                      placeholder="Event description"
                      className={`${inputClass} min-h-24 resize-y`}
                    />
                  </label>
                  <label className="text-sm font-medium text-[#142C45]/80 dark:text-white/75">
                    Event date
                    <input
                      name="eventDate"
                      type="date"
                      defaultValue={event.eventDate}
                      className={inputClass}
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="text-sm font-medium text-[#142C45]/80 dark:text-white/75">
                      Start time
                      <input
                        name="startTime"
                        type="time"
                        defaultValue={event.startTime}
                        className={inputClass}
                      />
                    </label>
                    <label className="text-sm font-medium text-[#142C45]/80 dark:text-white/75">
                      End time
                      <input
                        name="endTime"
                        type="time"
                        defaultValue={event.endTime}
                        className={inputClass}
                      />
                    </label>
                  </div>
                  <label className="text-sm font-medium text-[#142C45]/80 dark:text-white/75">
                    Location
                    <input
                      name="location"
                      defaultValue={event.location}
                      placeholder="Location"
                      className={inputClass}
                    />
                  </label>
                  <label className="text-sm font-medium text-[#142C45]/80 dark:text-white/75">
                    City
                    <input
                      name="city"
                      defaultValue={event.city}
                      placeholder="City"
                      className={inputClass}
                    />
                  </label>
                  <label className="text-sm font-medium text-[#142C45]/80 dark:text-white/75">
                    Organizer
                    <input
                      name="organizer"
                      defaultValue={event.organizer}
                      placeholder="Organizer"
                      className={inputClass}
                    />
                  </label>
                  <label className="text-sm font-medium text-[#142C45]/80 dark:text-white/75">
                    Volunteer capacity
                    <input
                      name="volunteerCapacity"
                      type="number"
                      defaultValue={event.volunteerCapacity}
                      placeholder="100"
                      className={inputClass}
                    />
                  </label>
                  <label className="text-sm font-medium text-[#142C45]/80 sm:col-span-2 dark:text-white/75">
                    Image URL
                    <input
                      name="imageUrl"
                      defaultValue={event.imageUrl}
                      placeholder="https://..."
                      className={inputClass}
                    />
                  </label>
                </div>
                <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setDialog(null)}
                    disabled={isPending}
                    className="cursor-pointer rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-[#142C45] transition hover:bg-gray-100 dark:border-white/10 dark:text-white/80 dark:hover:bg-white/[0.06]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="cursor-pointer rounded-xl bg-[#142C45] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1e3d5f] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#d9e9c5] dark:text-[#203242] dark:hover:bg-white"
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
                    className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-300/15 dark:bg-red-300/[0.06] dark:text-red-200"
                  >
                    {errorMessage}
                  </p>
                )}
                <p className="text-sm leading-6 text-[#142C45]/75 dark:text-white/65">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-[#142C45] dark:text-white">
                    {event.title}
                  </span>
                  ?
                </p>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setDialog(null)}
                    disabled={isPending}
                    className="cursor-pointer rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-[#142C45] transition hover:bg-gray-100 dark:border-white/10 dark:text-white/80 dark:hover:bg-white/[0.06]"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isPending}
                    className="cursor-pointer rounded-xl border border-red-300 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-transparent dark:text-red-300 dark:hover:bg-white/[0.06]"
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
  "mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-sm text-[#142C45] outline-none transition placeholder:text-gray-400 focus:border-[#142C45]/60 focus:ring-2 focus:ring-[#142C45]/10 dark:border-white/10 dark:bg-[#111b27] dark:text-white dark:placeholder:text-white/30 dark:focus:border-[#d9e9c5]/60 dark:focus:ring-[#d9e9c5]/10";

export default Btn;
