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
  startTime: z.string({
    required_error: "A start time is required.",
  }),
  end: z.date({
    required_error: "An end date is required.",
  }),
  endTime: z.string({
    required_error: "An end time is required.",
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
