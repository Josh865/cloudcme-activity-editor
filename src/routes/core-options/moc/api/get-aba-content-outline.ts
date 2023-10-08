import { useQuery } from "@tanstack/react-query";
import ky from "ky";

import { abaContentOutline } from "../data/aba-content-outline";

// import { ABAContentOutline } from "../schemas";
// import { ABAContentOutlineResponse } from "../types";

export type AbaContentOutline = typeof abaContentOutline;

const API_URL = import.meta.env.VITE_API_URL;

async function getAbaContentOutline(): Promise<AbaContentOutline> {
  return abaContentOutline;
}

export function useAbaContentOutline() {
  return useQuery({
    queryKey: ["abaContentOutline"],
    queryFn: () => getAbaContentOutline(),
  });
}
