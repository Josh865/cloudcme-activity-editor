import { z } from "zod";

import {
  AbaContentOutlineSchema,
  ActivityMocInformationSchema,
  MocBoardInformationSchema,
  MocBoardSchema,
} from "../schemas";

export type MocBoard = z.infer<typeof MocBoardSchema>;

export type AbaContentOutline = z.infer<typeof AbaContentOutlineSchema>;

export type ActivityMocInformation = z.infer<
  typeof ActivityMocInformationSchema
>;

export type ActivityMocBoardInformation = z.infer<
  typeof MocBoardInformationSchema
>;
