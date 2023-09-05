import { formatISO } from "date-fns";
import { z } from "zod";

const timeRegEx = new RegExp(
  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/,
);

export const BasicInformationResponseSchema = z.object({
  id: z.number(),
  eventName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(300, {
      message: "Name must not be longer than 30 characters.",
    }),
  start: z.coerce
    .date({
      required_error: "A start date is required.",
    })
    .transform((val) => formatISO(val, { representation: "date" })),
  timeStart: z.string().regex(timeRegEx),
  end: z.coerce
    .date({
      required_error: "An end date is required.",
    })
    .transform((val) => formatISO(val, { representation: "date" })),
  timeEnd: z.string().regex(timeRegEx),
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
  eventCountry: z.string({
    required_error: "Please select a country.",
  }),
  eventCity: z.string({
    required_error: "Please select a city.",
  }),
  eventState: z.string({
    required_error: "Please select a state.",
  }),
  eventActive: z.boolean(),
  // isPublished: z.boolean(),
  eventRegistrationActive: z.boolean(),
  people: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
});

export const BasicInformationRequestSchema =
  BasicInformationResponseSchema.omit({
    id: true,
  });
