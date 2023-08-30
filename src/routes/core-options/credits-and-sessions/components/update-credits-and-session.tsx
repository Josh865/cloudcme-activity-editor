import { useParams } from "react-router-dom";

import { toast } from "~/components/ui/use-toast";

import { useUpdateSession } from "../api/sessions/update-session";
import { useSessionsList } from "../route";
import { SessionsRequest } from "../types";
import { CreditsAndSessionsForm } from "./credits-and-sessions-form";

export default function UpdateCreditsAndSession() {
  const params = useParams();
  const sessionId = Number(params.sessionId);
  const sessions = useSessionsList();
  const updateSession = useUpdateSession(sessionId);

  const session = sessions.find((s) => s.sessionId === sessionId);

  // TODO: Add error boundary to catch this
  if (!session) {
    throw Error("Session could not be found");
  }

  function onSubmit(data: SessionsRequest) {
    updateSession.mutate(data, {
      onSuccess: () => {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
      },
    });
  }

  return <CreditsAndSessionsForm values={session} onSubmit={onSubmit} />;
}
