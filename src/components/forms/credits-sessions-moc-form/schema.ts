import { z } from "zod";

export const sessionsFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  start: z.date(),
  end: z.date(),
  room: z.string(),
  seatingCapacity: z.coerce.number({
    invalid_type_error: "Please enter a valid number",
  }),
  description: z.string(),
  credits: z.array(
    z.object({
      name: z.string(),
      hours: z
        .string()
        .or(z.number())
        .transform((val, ctx) => {
          if (isNaN(Number(val))) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Please enter a valid number",
            });

            return z.NEVER;
          }

          return val;
        }),
      // hours: z.coerce.number({
      //   invalid_type_error: "Please enter a valid number",
      // }),
    }),
  ),
});

export type SessionsFormValues = z.infer<typeof sessionsFormSchema>;
