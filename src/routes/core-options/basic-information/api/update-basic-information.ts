import { useMutation } from "@tanstack/react-query";
import ky from "ky";

import { toast } from "~/components/ui/use-toast";

import { BasicInformationRequest } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

type UpdateBasicInformationParams = {
  values: BasicInformationRequest;
  activityId: number;
};

async function updateBasicInformation({
  values,
  activityId,
}: UpdateBasicInformationParams) {
  return ky.put(`${API_URL}/activities/${activityId}`, { json: values }).json();
}

export function useUpdateBasicInformation(activityId: number) {
  return useMutation({
    mutationFn: (values: BasicInformationRequest) =>
      updateBasicInformation({ values, activityId }),
    onSuccess: () => {
      toast({
        title: "Basic info updated",
      });
    },
  });
}
