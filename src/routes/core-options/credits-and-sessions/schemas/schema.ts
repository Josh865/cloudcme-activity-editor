import { z } from "zod";

export const CreditsResponseSchema = z.object({
  creditTypeId: z.number(),
  name: z.string(),
});

// ---

export const SessionSchema = z.object({
  eventId: z.number(),
  sessionId: z.number(),
  name: z
    .string()
    .min(1, {
      message: "Name must be at least 1 character.",
    })
    .max(255, {
      message: "Name must not be longer than 255 characters.",
    }),
  start: z.coerce.date(),
  end: z.coerce.date(),
  room: z.string().optional(),
  seatingCapacity: z.coerce.number({
    invalid_type_error: "Please enter a valid number",
  }),
  description: z.string().optional(),
  credits: z.array(
    z.object({
      creditTypeId: z.coerce.number(),
      name: z.string(),
      hours: z.coerce.number(),
    }),
  ),
});

// ---

// This is the shape of the data returned by the API
export const SessionsResponseSchema = z.array(SessionSchema);

// ---

// This is shape of the data sent to the API endpoint to create the session.
// In this case, we simply take the response and moit the eventId and sessionId
// since those are part of the URL rather than being sent as part of the from
// data. The credits array is also replaced with a version that exludes the name
export const SessionsRequestSchema = SessionSchema.omit({
  eventId: true,
  sessionId: true,
  credits: true,
}).extend({
  // TODO: There's probably a better way to do this
  credits: z.array(
    z.object({
      creditTypeId: z.coerce.number(),
      hours: z.coerce.number(),
    }),
  ),
});
