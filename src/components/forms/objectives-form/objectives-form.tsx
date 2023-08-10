import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormProvider,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/use-toast";
import { FormSection } from "~/components/form-section";

import { objectivesFormSchema, ObjectivesFormValues } from "./schema";

export function ObjectivesForm() {
  const form = useForm<ObjectivesFormValues>({
    resolver: zodResolver(objectivesFormSchema),
    defaultValues: {
      introductionText: "",
      objectives: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "objectives",
    control: form.control,
  });

  function onSubmit(data: ObjectivesFormValues) {
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
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <FormSection
          heading="Introductory Text"
          description="This will appear before the list of objectives."
        >
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="introductionText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Introduction Text</FormLabel>
                  <FormControl>
                    <Input className="w-full md:max-w-md" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormSection>

        <Separator />

        <FormSection heading="Objectives">
          <div className="space-y-8">
            <div>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-x-2">
                  <FormField
                    control={form.control}
                    name={`objectives.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="max-w-md flex-1">
                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                          Objective
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} />
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
                onClick={() => append({ value: "" })}
              >
                Add Objective
              </Button>
            </div>
          </div>
        </FormSection>

        <Separator />

        <Button type="submit">Save Changes</Button>
      </form>
    </FormProvider>
  );
}
