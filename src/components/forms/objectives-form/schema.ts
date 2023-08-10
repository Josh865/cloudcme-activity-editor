import { z } from "zod";

export const objectivesFormSchema = z.object({
  introductionText: z.string(),
  objectives: z.array(
    z.object({
      value: z.string(),
    }),
  ),
});

export type ObjectivesFormValues = z.infer<typeof objectivesFormSchema>;
