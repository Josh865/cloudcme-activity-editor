import { useQuery } from "@tanstack/react-query";

import { SessionsResponse } from "../../types";

async function getSessions(eventId: number): Promise<SessionsResponse> {
  const sessionsData: SessionsResponse = [
    {
      eventId: eventId,
      sessionId: 1,
      name: "The First Session",
      start: new Date(2023, 5, 7),
      end: new Date(2023, 5, 9),
      room: "Conference Room",
      seatingCapacity: 20,
      description: "This is a description of the first session.",
      credits: [
        {
          creditTypeId: 1,
          name: "AMA/PRA Category 1",
          hours: 1,
        },
        {
          creditTypeId: 3,
          name: "Non-Physician Attendance",
          hours: 2,
        },
      ],
    },
    {
      eventId: eventId,
      sessionId: 2,
      name: "The Second Session",
      start: new Date(2023, 5, 10),
      end: new Date(2023, 5, 12),
      room: "General Purpose Room",
      seatingCapacity: 197,
      description: "This is a description of the second session.",
      credits: [
        {
          creditTypeId: 1,
          name: "AMA/PRA Category 1",
          hours: 1,
        },
        {
          creditTypeId: 5,
          name: "AAFP - American Academy of Family Physicians",
          hours: 3,
        },
      ],
    },
  ];

  return sessionsData;
}

export function useSessions(eventId: number) {
  return useQuery({
    queryKey: ["sessions", eventId],
    queryFn: () => getSessions(eventId),
  });
}
