import { useQuery } from "@tanstack/react-query";
import ky from "ky";

import { BasicInformationResponse } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

async function getBasicInformation(
  activityId: number,
): Promise<BasicInformationResponse> {
  return ky.get(`${API_URL}/activities/${activityId}`).json();
}

export function useBasicInformation(activityId: number) {
  return useQuery({
    queryKey: ["basicInfo", activityId],
    queryFn: () => getBasicInformation(activityId),
  });
}
