import { TimeValue } from "react-aria-components";
import { z } from "zod";

export const BasicInformationResponseSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  start: z.date({
    required_error: "A start date is required.",
  }),
  startTime: z.any().superRefine((arg, ctx): arg is TimeValue => {
    if (!arg) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter a valid time",
      });
    }
    // The return value is not used, but we need to return something to satisfy the typing
    return z.NEVER;
  }),
  end: z.date({
    required_error: "An end date is required.",
  }),
  endTime: z.any().superRefine((arg, ctx): arg is TimeValue => {
    if (!arg) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter a valid time",
      });
    }
    // The return value is not used, but we need to return something to satisfy the typing
    return z.NEVER;
  }),
  facility: z
    .string({
      required_error: "Please select a facility.",
    })
    .optional(),
  location: z
    .string({
      required_error: "Please select a location.",
    })
    .optional(),
  department: z
    .string({
      required_error: "Please select a department.",
    })
    .optional(),
  country: z.string({
    required_error: "Please select a country.",
  }),
  city: z.string({
    required_error: "Please select a city.",
  }),
  state: z.string({
    required_error: "Please select a state.",
  }),
  isActive: z.boolean(),
  isPublished: z.boolean(),
  isRegistrationOpen: z.boolean(),
});

export const BasicInformationRequestSchema =
  BasicInformationResponseSchema.omit({
    id: true,
  });
