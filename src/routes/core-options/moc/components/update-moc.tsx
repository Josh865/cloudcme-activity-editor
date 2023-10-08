import { useParams } from "react-router-dom";

import { useMocInformation } from "../api/get-moc-information";
import { useUpdateMocInformation } from "../api/update-moc-information";
import { MocForm } from "./moc-form";

export function UpdateMoc() {
  const activityId = Number(useParams().activityId);

  const {
    data: mocInformation,
    isLoading,
    isError,
  } = useMocInformation(activityId);

  // This hook is used to make a put request to update the data for the given
  // activityId when the form is submitted.
  const updateMocInformation = useUpdateMocInformation(activityId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  // The fields are split into their own component since the defaultValues need
  // to be fetched from the API and so will be undefined when the component
  // mounts. Since we can't call hooks conditionally, we have to conditionally
  // render the form once we have a response from the API.
  return (
    <MocForm
      defaultValues={mocInformation}
      onSubmit={updateMocInformation.mutate}
      isMutating={updateMocInformation.isLoading}
    />
  );
}
