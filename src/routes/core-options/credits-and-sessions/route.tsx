import { useEffect } from "react";
import { PlusIcon } from "lucide-react";
import {
  NavLink,
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

import { useSessions } from "./api/sessions/get-sessions";
import type { SessionsResponse } from "./types";

export default function CreditsAndSessionsLayout() {
  const { activityId } = useParams();
  const navigate = useNavigate();

  const {
    data: sessions,
    isLoading,
    isError,
  } = useSessions(Number(activityId));

  // This could be done in a loader, but I'm hesitant to introduce two different
  // data fetching paradigms. However, losing the useEffect would be nice. Need
  // to think more about that.
  useEffect(() => {
    if (sessions !== undefined) {
      navigate(sessions[0].sessionId.toString());
    }
  }, [navigate, sessions]);

  if (isLoading || isError) return null;

  return (
    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside className="-mx-4 lg:w-1/4">
        <div className="sticky top-4 flex flex-wrap space-x-2 lg:flex-col lg:space-x-0">
          {sessions.map((session) => (
            <NavLink
              key={session.sessionId}
              to={session.sessionId.toString()}
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: "ghost" }),
                  "flex justify-start whitespace-nowrap",
                  isActive
                    ? "bg-muted text-foreground hover:bg-muted"
                    : "font-normal text-muted-foreground hover:bg-transparent hover:underline",
                )
              }
            >
              {session.name}
            </NavLink>
          ))}
          <Separator className="my-4" />
          <NavLink
            to="create"
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "ghost" }),
                "flex justify-start whitespace-nowrap",
                isActive
                  ? "bg-muted text-foreground hover:bg-muted"
                  : "font-normal text-muted-foreground hover:bg-transparent hover:underline",
              )
            }
          >
            <PlusIcon className="mr-1 h-4 w-4" />
            Add Session
          </NavLink>
        </div>
      </aside>
      <div className="flex-1">
        <Outlet context={sessions} />
      </div>
    </div>
  );
}

// Custom hook to consume outlet context so data will be properly typed
export function useSessionsList() {
  return useOutletContext<SessionsResponse>();
}
