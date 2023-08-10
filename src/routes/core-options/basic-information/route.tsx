import { useParams } from "react-router-dom";

import { CreateBasicInformation } from "./components/create-basic-information";
import { UpdateBasicInformation } from "./components/update-basic-information";

export default function BasicInformation() {
  const { activityId } = useParams();

  if (!activityId) {
    return <CreateBasicInformation />;
  }

  return <UpdateBasicInformation />;
}
