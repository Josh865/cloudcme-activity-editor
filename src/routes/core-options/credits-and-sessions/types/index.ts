import { z } from "zod";

import {
  CreditsResponseSchema,
  SessionSchema,
  SessionsRequestSchema,
  SessionsResponseSchema,
} from "../schemas/schema";

export type Session = z.infer<typeof SessionSchema>;

export type SessionsResponse = z.infer<typeof SessionsResponseSchema>;

export type SessionsRequest = z.infer<typeof SessionsRequestSchema>;

export type CreditType = z.infer<typeof CreditsResponseSchema>;
