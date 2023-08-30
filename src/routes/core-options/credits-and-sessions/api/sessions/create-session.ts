import { useMutation } from "@tanstack/react-query";

import { toast } from "~/components/ui/use-toast";

import { SessionsRequest } from "../../types";

async function createSession(session: SessionsRequest, eventId: number) {
  return { ...session, sessionId: Math.floor(Math.random() * 100) };
}

export function useCreateSession(eventId: number) {
  return useMutation({
    mutationFn: (session: SessionsRequest) => createSession(session, eventId),
    onSuccess: (session: SessionsRequest) => {
      toast({
        title: "Session created",
      });
    },
  });
}
