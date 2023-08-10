import { useParams } from "react-router-dom";

import { useBasicInformation } from "../api/get-basic-information";
import { useUpdateBasicInformation } from "../api/update-basic-information";
import { BasicInformationForm } from "./basic-information-form";

export function UpdateBasicInformation() {
  const activityId = Number(useParams().activityId);

  const { data, isLoading, isError } = useBasicInformation(activityId);

  // This hook is used to make a put request to update the data for the given
  // activityId when the form is submitted.
  const updateBasicInformation = useUpdateBasicInformation(activityId);

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Error";
  }

  // The fields are split into their own component since the defaultValues need
  // to be fetched from the API and so will be undefined when the component
  // mounts. Since we can't call hooks conditionally, we have to conditionally
  // render the form once we have a response from the API.
  return (
    <BasicInformationForm
      defaultValues={data}
      onSubmit={updateBasicInformation.mutate}
      isMutating={updateBasicInformation.isLoading}
    />
  );
}
