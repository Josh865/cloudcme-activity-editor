import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, XIcon } from "lucide-react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";

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
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "~/components/ui/listbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Textarea } from "~/components/ui/textarea";

import { useCredits } from "../api/credits/get-credits";
import { SessionsRequestSchema } from "../schemas/schema";
import { Session, SessionsRequest } from "../types";

export function CreditsAndSessionsForm({
  values,
  onSubmit,
}: {
  values: Session;
  onSubmit: (data: SessionsRequest) => void;
}) {
  const form = useForm<SessionsRequest>({
    resolver: zodResolver(SessionsRequestSchema),
    values,
    mode: "onChange",
  });

  return (
    <>
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

          <Credits />

          <div className="flex max-w-md items-center justify-between">
            <Button type="submit">Save Session</Button>
            {values !== undefined && (
              <Button
                type="button"
                variant="destructive"
                className="border border-destructive bg-background text-destructive hover:text-destructive-foreground"
                //onClick={}
              >
                Delete Session
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}

function Credits() {
  const params = useParams();
  const eventId = Number(params.activityId); // TODO: Consistent naming, event or activity?
  const { data: credits, isLoading, isError } = useCredits(eventId); // TODO: Does this need the eventId?
  const form = useFormContext();
  const {
    fields: creditFields,
    append: appendCredit,
    remove: removeCredit,
  } = useFieldArray({
    name: "credits",
  });

  const assignedCredits: SessionsRequest["credits"] = form.watch("credits", []);

  // TODO: Handle this better
  if (isLoading || isError) return null;

  const availableCredits = (selectedCreditId: number) => {
    return credits.filter(
      (credit) =>
        !assignedCredits.some(
          (assignedCredit) =>
            assignedCredit.creditTypeId === credit.creditTypeId,
        ) || credit.creditTypeId === selectedCreditId,
    );
  };

  return (
    <div>
      {creditFields.map((field, index) => (
        <div
          key={field.id}
          className="grid max-w-md grid-cols-[1fr,100px,auto] gap-3"
        >
          <FormField
            control={form.control}
            name={`credits.${index}.creditTypeId`}
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Credit
                  </FormLabel>
                  <Listbox
                    value={field.value}
                    onChange={(value) => form.setValue(field.name, value)}
                  >
                    <FormControl>
                      <ListboxButton>
                        <div className="line-clamp-1">
                          {credits.find((c) => c.creditTypeId === field.value)
                            ?.name ?? ""}
                        </div>
                      </ListboxButton>
                    </FormControl>
                    <ListboxOptions>
                      {availableCredits(field.value).map((credit) => (
                        <ListboxOption
                          key={credit.creditTypeId}
                          value={credit.creditTypeId}
                        >
                          {credit.name}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Listbox>
                  <FormMessage />
                </FormItem>
              </>
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
          {assignedCredits.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={cn(
                "h-auto hover:border-destructive/20 hover:bg-destructive/10",
                index === 0 ? "mt-8" : "mt-2",
              )}
              onClick={() => removeCredit(index)}
            >
              <XIcon className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => appendCredit({ creditTypeId: 0, name: "", hours: "" })}
      >
        Add Credit
      </Button>
    </div>
  );
}
