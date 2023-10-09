import * as z from "zod";

const ABA_ID = 38;

export const MocBoardSchema = z.object({
  id: z.number(),
  name: z.string(),
  types: z.array(z.string()),
  specialties: z.array(z.string()),
});

export const AbaContentOutlineSchema = z.object({
  id: z.string(),
  name: z.string(),
  otherDescription: z.string().optional(),
});

// User-supplied details for each selected board
export const MocBoardInformationSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    points: z.coerce.number(),
    types: z.array(z.string()).min(1, {
      message: "At least one MOC Type is required",
    }),
    specialties: z.array(z.string()).min(1, {
      message: "At least one specialty is required",
    }),
    abaContentOutline: z
      .array(
        AbaContentOutlineSchema.extend({
          otherDescription: z.string().optional(),
        }),
      )
      .optional(),
  })
  .superRefine(({ id, abaContentOutline }, ctx) => {
    // Check is only applicable to ABA
    if (id !== ABA_ID) return;

    if (!abaContentOutline || abaContentOutline.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "At least one content area is required",
        path: ["abaContentOutline"],
      });
    }

    if (abaContentOutline && abaContentOutline.length > 2) {
      ctx.addIssue({
        code: "custom",
        message: "A maximum of two content areas are permitted",
        path: ["abaContentOutline"],
      });
    }
  });

// API response for MOC info specific to this activity
export const ActivityMocInformationSchema = z.object({
  enableMoc: z.coerce.boolean(),
  claimByDate: z.coerce.date(),
  boards: z.array(MocBoardInformationSchema),
});
