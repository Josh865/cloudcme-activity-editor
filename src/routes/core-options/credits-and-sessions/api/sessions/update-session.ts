import { useMutation } from "@tanstack/react-query";

import { SessionsRequest } from "../../types";

async function updateSession(session: SessionsRequest) {
  return session;
}

export function useUpdateSession(sessionId: number) {
  return useMutation({
    mutationFn: (session: SessionsRequest) => updateSession(session),
  });
}
