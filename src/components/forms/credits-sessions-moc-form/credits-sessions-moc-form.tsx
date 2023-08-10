import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon, XIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { useFieldArray, useForm } from "react-hook-form";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/use-toast";

import { sessionsFormSchema, SessionsFormValues } from "./schema";

type SessionData = SessionsFormValues & { id: number | string };

const sessionsData: SessionData[] = [
  {
    id: 1,
    name: "The First Session",
    start: new Date(2023, 5, 7),
    end: new Date(2023, 5, 9),
    room: "Conference Room",
    seatingCapacity: 20,
    description: "This is a description of the first session.",
    credits: [
      {
        name: "AMA/PRA Category 1",
        hours: 1,
      },
      {
        name: "Non-Physician Attendance",
        hours: 2,
      },
    ],
  },
  {
    id: 2,
    name: "The Second Session",
    start: new Date(2023, 5, 10),
    end: new Date(2023, 5, 12),
    room: "General Purpose Room",
    seatingCapacity: 197,
    description: "This is a description of the second session.",
    credits: [
      {
        name: "AMA/PRA Category 1",
        hours: 1,
      },
      {
        name: "CNE",
        hours: 2,
      },
    ],
  },
];

const emptySession = {
  name: "New Session",
  start: new Date(),
  end: new Date(),
  room: "",
  seatingCapacity: 0,
  description: "",
  credits: [],
};

export function CreditsSessionsMocForm() {
  const [sessions, setSessions] = useState(sessionsData);
  const [selectedSessionId, setSelectedSessionId] = useState(sessions[0].id);

  const form = useForm<SessionsFormValues>({
    resolver: zodResolver(sessionsFormSchema),
    defaultValues: sessions.find((s) => s.id === selectedSessionId),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "credits",
    control: form.control,
  });

  // Update form values when session is selected
  useEffect(() => {
    let session = sessions.find((s) => s.id === selectedSessionId);

    if (!session) {
      session = sessions[0];
    }

    const { id, ...nextValues } = session;

    form.reset(nextValues);
  }, [form, sessions, selectedSessionId]);

  function createSession() {
    const id = nanoid();
    const newSession = { ...emptySession, id };
    setSessions([...sessions, newSession]);
    setSelectedSessionId(id);
  }

  function deleteSession() {
    const nextSessions = sessions.filter((s) => s.id !== selectedSessionId);
    const nextSelectedSessionId = nextSessions[0]?.id;

    setSessions(nextSessions);
    setSelectedSessionId(nextSelectedSessionId);
  }

  function onSubmit(data: SessionsFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside className="-mx-4 lg:w-1/4">
        <div className="sticky top-4 flex flex-wrap space-x-2 lg:flex-col lg:space-x-0">
          {sessions.map((session) => (
            <Button
              key={session.id}
              variant="ghost"
              className={cn(
                session.id === selectedSessionId
                  ? "bg-muted text-foreground hover:bg-muted"
                  : "font-normal text-muted-foreground hover:bg-transparent hover:underline",
                "flex justify-start whitespace-nowrap",
              )}
              onClick={() => setSelectedSessionId(session.id)}
            >
              {session.name}
            </Button>
          ))}
          <Separator className="my-4" />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="font-normal"
            onClick={createSession}
          >
            <PlusIcon className="mr-1 h-4 w-4" />
            Create Session
          </Button>
        </div>
      </aside>
      <div className="flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="max-w-md">
                  <FormLabel>Session Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full max-w-md gap-3">
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col items-start">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full flex-1 pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full max-w-md gap-3">
              <FormField
                control={form.control}
                name="room"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Room</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seatingCapacity"
                render={({ field }) => (
                  <FormItem className="w-[150px]">
                    <FormLabel>Seating Capacity</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="max-w-md">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              {fields.map((field, index) => (
                <div key={field.id} className="flex max-w-md gap-3">
                  <FormField
                    control={form.control}
                    name={`credits.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                          Credits
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`credits.${index}.hours`}
                    render={({ field }) => (
                      <FormItem className="w-[100px]">
                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                          Hours
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={cn(
                      "hover:border-destructive/20 hover:bg-destructive/10",
                      index === 0 ? "mt-8" : "mt-2",
                    )}
                    onClick={() => remove(index)}
                  >
                    <XIcon className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({ name: "", hours: "" })}
              >
                Add Credit
              </Button>
            </div>
            <div className="flex max-w-md items-center justify-between">
              <Button type="submit">Save Changes</Button>
              {sessions.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  className="border border-destructive bg-background text-destructive hover:text-destructive-foreground"
                  onClick={deleteSession}
                >
                  Delete Session
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
