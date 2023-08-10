import { z } from "zod";

import { BasicInformationResponseSchema } from "../schemas";

export type BasicInformationResponse = z.infer<
  typeof BasicInformationResponseSchema
>;

export type BasicInformationRequest = Omit<BasicInformationResponse, "id">;
