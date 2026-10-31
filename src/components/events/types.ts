export interface Event {
  _id: string;
  title: string;
  category: string;
  categoryId: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  city: string;
  organizer: string;
  volunteerCapacity?: number;
  joinedVolunteers: number;
  imageUrl: string;
  status: "upcoming" | "ongoing" | "completed";
  createdAt?: string;
}

export function isEvent(value: unknown): value is Event {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const event = value as Record<string, unknown>;

  return (
    typeof event._id === "string" &&
    typeof event.title === "string" &&
    typeof event.category === "string" &&
    typeof event.categoryId === "string" &&
    typeof event.description === "string" &&
    typeof event.eventDate === "string" &&
    typeof event.startTime === "string" &&
    typeof event.endTime === "string" &&
    typeof event.location === "string" &&
    typeof event.city === "string" &&
    typeof event.organizer === "string" &&
    (event.volunteerCapacity === undefined ||
      typeof event.volunteerCapacity === "number") &&
    typeof event.joinedVolunteers === "number" &&
    typeof event.imageUrl === "string" &&
    (event.status === "upcoming" ||
      event.status === "ongoing" ||
      event.status === "completed")
  );
}
