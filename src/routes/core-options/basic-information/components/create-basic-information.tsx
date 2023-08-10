import { useCreateBasicInformation } from "../api/create-basic-information";
import { BasicInformationRequest } from "../types";
import { BasicInformationForm } from "./basic-information-form";

const initialFormData: BasicInformationRequest = {
  name: "",
  start: new Date(),
  // @ts-ignore We don't want a default time and we cannot initialize a form value with undefined
  startTime: "",
  end: new Date(),
  // @ts-ignore We don't want a default time and we cannot initialize a form value with undefined
  endTime: "",
  facility: "",
  location: "",
  department: "",
  country: "",
  city: "",
  state: "",
  isActive: false,
  isPublished: false,
  isRegistrationOpen: false,
};

export function CreateBasicInformation() {
  const createBasicInformation = useCreateBasicInformation();

  return (
    <BasicInformationForm
      defaultValues={initialFormData}
      onSubmit={createBasicInformation.mutate}
      isMutating={createBasicInformation.isLoading}
    />
  );
}
