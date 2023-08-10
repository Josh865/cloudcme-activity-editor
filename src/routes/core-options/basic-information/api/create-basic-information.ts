import { useMutation } from "@tanstack/react-query";
import ky from "ky";

import { toast } from "~/components/ui/use-toast";

import { BasicInformationRequest } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

async function createBasicInformation(values: BasicInformationRequest) {
  return ky.post(`${API_URL}/activities`, { json: values }).json();
}

export function useCreateBasicInformation() {
  return useMutation({
    mutationFn: (values: BasicInformationRequest) =>
      createBasicInformation(values),
    onSuccess: () => {
      toast({
        title: "Basic info created",
      });
    },
  });
}
