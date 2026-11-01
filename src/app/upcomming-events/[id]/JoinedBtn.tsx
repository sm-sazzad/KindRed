"use client";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa";
import toast from "react-hot-toast";
import { getTokenClient } from "@/lib/AccessTokenClient";

interface Event {
  _id: string;
  title: string;
  email?: string;
  category: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  city: string;
  organizer: string;
  organizerEmail: string;
  volunteerCapacity: number;
  joinedVolunteers: number;
  imageUrl: string;
  status: "upcoming" | "ongoing" | "completed";
}

const JoinedBtn = ({ event }: { event: Event }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const session = useSession();
  const email = session.data?.user.email;
  console.log(event, "event");
  useEffect(() => {
    const checkJoined = async () => {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/joined/${event._id}?email=${email}`,
        {
          cache: "no-store",
          headers: { authorization: `Bearer ${await getTokenClient()}` },
        },
      );

      const data = await res.json();
      setIsJoined(data.isJoined);
      setIsLoading(false);
    };

    checkJoined();
  }, [event._id, email]);

  const handleJoinBtn = async () => {
    if (!email) {
      toast.error("Please sign in to join this event.");
      return;
    }

    setIsPending(true);
    try {
      if (isJoined) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/joined/${event._id}?email=${encodeURIComponent(email)}`,
          {
            method: "DELETE",
            headers: { authorization: `Bearer ${await getTokenClient()}` },
          },
        );

        const resData = await res.json();
        console.log(resData);

        if (res.ok && resData.deletedCount > 0) {
          setIsJoined(false);
          toast.success("Left the event successfully!");
        } else {
          toast.error("Could not leave the event. Please try again.");
        }
      } else {
        const { _id, email: _creatorEmail, ...eventDetails } = event;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/joined`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${await getTokenClient()}`,
            },
            body: JSON.stringify({
              ...eventDetails,
              eventId: _id,
              email,
              joinedAt: new Date().toISOString(),
            }),
          },
        );
        const resData = await res.json();
        if (res.ok && resData.insertedId && resData.acknowledged) {
          setIsJoined(true);
          toast.success("Joined the event successfully!");
        } else {
          toast.error("Could not join the event. Please try again.");
        }
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="mt-auto pt-8">
      <button
        onClick={handleJoinBtn}
        disabled={isLoading || isPending}
        className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#142C45] px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#1e3d5f] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-[#d9e9c5] dark:text-[#203228] dark:hover:bg-white"
      >
        {isLoading || isPending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-[#203228]/30 dark:border-t-[#203228]" />
            {isLoading ? "Loading..." : "Please wait..."}
          </>
        ) : isJoined ? (
          <>
            <BiLogOut size={25} />
            Leave This Event
          </>
        ) : (
          <>
            <FaBookmark size={25} />
            Join This Event
          </>
        )}
      </button>
    </div>
  );
};

export default JoinedBtn;
