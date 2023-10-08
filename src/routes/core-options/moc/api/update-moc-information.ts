import { useMutation } from "@tanstack/react-query";
import ky from "ky";

import { toast } from "~/components/ui/use-toast";

import { ActivityMocInformation } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

type UpdateMocInformationParams = {
  values: ActivityMocInformation;
  activityId: number;
};

//TODO: Replace with API
async function updateMocInformation({
  values,
  activityId,
}: UpdateMocInformationParams) {
  console.log(JSON.stringify(values));
  return true;
}

export function useUpdateMocInformation(activityId: number) {
  return useMutation({
    mutationFn: (values: ActivityMocInformation) =>
      updateMocInformation({ values, activityId }),
    onSuccess: () => {
      toast({
        title: "MOC Information updated",
      });
    },
  });
}
