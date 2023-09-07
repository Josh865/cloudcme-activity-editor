import { useParams } from "react-router-dom";

import { toast } from "~/components/ui/use-toast";

import { useCreateSession } from "../api/sessions/create-session";
import { SessionsRequest } from "../types";
import { CreditsAndSessionsForm } from "./credits-and-sessions-form";

export function CreateCreditsAndSession() {
  const params = useParams();
  const activityId = Number(params.activityId);
  const createSession = useCreateSession(activityId);

  function onSubmit(data: SessionsRequest) {
    createSession.mutate(data, {
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

  const me: any = 'Josh'

  const emptySession = {
    sessionId: 0,
    eventId: 0,
    name: "",
    start: new Date(),
    end: new Date(),
    room: "",
    seatingCapacity: 0,
    description: "",
    credits: [],
  };

  return <CreditsAndSessionsForm values={emptySession} onSubmit={onSubmit} />;
}
