import { useEffect } from "react";
import { Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { get, useFieldArray, useForm } from "react-hook-form";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Checkbox } from "~/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormProvider,
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
import { Separator } from "~/components/ui/separator";
import { Switch } from "~/components/ui/switch";
import { FormSection } from "~/components/form-section";
import { useMocBoards } from "~/routes/core-options/moc/api/get-moc-boards";

import { ActivityMocInformationSchema } from "../schemas";
import { ActivityMocInformation, MocBoard } from "../types";
import { AbaContentOutlineDialog } from "./aba-content-outline-dialog";

type MocFormProps = {
  defaultValues: Partial<ActivityMocInformation>;
  onSubmit: (values: ActivityMocInformation) => void;
  isMutating: boolean;
};

const ABA_ID = 38;

export function MocForm({ defaultValues, onSubmit, isMutating }: MocFormProps) {
  const boardsQuery = useMocBoards();

  const form = useForm<ActivityMocInformation>({
    resolver: zodResolver(ActivityMocInformationSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "boards",
    keyName: "key", // To prevent RHF from overwriting board ID
  });

  const isMocEnabled = form.watch("enableMoc");
  const selectedBoardIds = form.watch("boards")?.map((board) => board.id) ?? [];

  // Clear form values when MOC is disabled, or set default date when MOC is
  // (re)enabled
  useEffect(() => {
    if (!isMocEnabled) {
      form.setValue("boards", []);
      form.setValue("claimByDate", undefined);
    } else {
      form.setValue("claimByDate", new Date());
    }
  }, [isMocEnabled, form]);

  function selectBoard(board: MocBoard) {
    append({
      id: board.id,
      points: 0,
      name: board.name,
      specialties: [],
      types: [],
    });
  }

  function deselectBoard(board: MocBoard) {
    const index = getFieldIndex(board);
    remove(index);
  }

  function getFieldIndex(board: MocBoard) {
    return fields.findIndex((field) => field.id === board.id);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <FormSection heading="Register for MOC">
          <FormField
            control={form.control}
            name="enableMoc"
            render={({ field }) => (
              <FormItem className="flex max-w-2xl flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Register for MOC</FormLabel>
                  <FormDescription>
                    Register this CME activity for MOC so that physician
                    attendees may receive MOC point/credits.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </FormSection>

        {isMocEnabled && (
          <>
            <Separator />

            <FormSection heading="Deadline">
              <FormField
                control={form.control}
                name="claimByDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>Last Day to Claim Credit</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[250px] pl-3 text-left font-normal",
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
            </FormSection>

            <Separator />

            <FormSection
              heading="MOC Boards"
              description="Select the board(s) for which attendance at this activity may be used to count towards MOC requirements."
            >
              <div className="flex flex-col gap-y-6">
                <p className="rounded-md border border-destructive p-4 text-sm text-destructive empty:hidden">
                  {get(form.formState.errors, "boards")?.message}
                </p>
                {boardsQuery.data?.map((board) => (
                  <div key={board.id} className="rounded-md border bg-muted">
                    <div
                      className={cn(
                        "rounded-md bg-background p-4 transition-shadow duration-300",
                        selectedBoardIds.includes(board.id)
                          ? "shadow-md"
                          : "shadow-none",
                      )}
                    >
                      <FormItem className="flex items-center gap-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={selectedBoardIds.includes(board.id)}
                            onCheckedChange={(checked) =>
                              checked
                                ? selectBoard(board)
                                : deselectBoard(board)
                            }
                          />
                        </FormControl>
                        <FormLabel
                          className={cn(
                            selectedBoardIds.includes(board.id)
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {board.name}
                        </FormLabel>
                      </FormItem>
                    </div>
                    <Transition
                      show={fields.some((field) => field.id === board.id)}
                      enter="transition-all duration-300"
                      enterFrom="grid-rows-[0fr] opacity-0"
                      enterTo="grid-rows-[1fr] opacity-100"
                      leave="transition-all duration-300"
                      leaveFrom="opacity-100 grid-rows-[1fr]"
                      leaveTo="opacity-0 grid-rows-[0fr]"
                      className="grid"
                    >
                      <div className="row-span-2 row-start-1 overflow-hidden">
                        <div className="flex flex-col items-start gap-4 p-4 md:flex-row">
                          <FormField
                            control={form.control}
                            name={`boards.${getFieldIndex(board)}.points`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Points</FormLabel>
                                <FormControl>
                                  <Input
                                    className="w-full transition-[max-height,opacity] md:w-[100px] md:max-w-md"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`boards.${getFieldIndex(board)}.types`}
                            render={({ field }) => (
                              <FormItem className="w-full md:w-auto md:flex-[1_0_auto]">
                                <FormLabel>Types</FormLabel>
                                <Listbox
                                  onChange={field.onChange}
                                  value={field.value ?? []}
                                  multiple
                                >
                                  <ListboxButton className="truncate">
                                    {field.value?.length > 0
                                      ? `${field.value.length} Selected`
                                      : "Select Types"}
                                  </ListboxButton>
                                  <ListboxOptions>
                                    {board.types.map((type) => (
                                      <ListboxOption key={type} value={type}>
                                        {type}
                                      </ListboxOption>
                                    ))}
                                  </ListboxOptions>
                                </Listbox>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`boards.${getFieldIndex(board)}.specialties`}
                            render={({ field }) => (
                              <FormItem className="w-full flex-[1_0_auto] md:w-auto">
                                <FormLabel>Specialties</FormLabel>
                                <Listbox
                                  onChange={field.onChange}
                                  value={field.value ?? []}
                                  multiple
                                >
                                  <ListboxButton className="h-auto">
                                    <div className="truncate">
                                      {field.value?.length > 0
                                        ? `${field.value.length} Selected`
                                        : "Select Specialties"}
                                    </div>
                                  </ListboxButton>
                                  <ListboxOptions>
                                    {board.specialties.map((specialty) => (
                                      <ListboxOption
                                        key={specialty}
                                        value={specialty}
                                      >
                                        {specialty}
                                      </ListboxOption>
                                    ))}
                                  </ListboxOptions>
                                </Listbox>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {board.id === ABA_ID && (
                            <FormField
                              control={form.control}
                              name={`boards.${getFieldIndex(
                                board,
                              )}.abaContentOutline`}
                              render={() => (
                                <FormItem className="w-full flex-1 md:max-w-xs">
                                  <FormLabel className="whitespace-nowrap">
                                    Content Outline
                                  </FormLabel>
                                  <AbaContentOutlineDialog
                                    fieldIndex={getFieldIndex(board)}
                                  />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>
                      </div>
                    </Transition>
                  </div>
                ))}
              </div>
            </FormSection>
          </>
        )}

        <Button type="submit" disabled={isMutating}>
          Save Changes
        </Button>
      </form>
    </FormProvider>
  );
}
