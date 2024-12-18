import { BacklogsBreadCrumb } from "./backlogs-breadcrumb";
import { BacklogsList } from "./backlogs-list";

export const Backlogs = () => {
  return (
    <div className="mb-6 space-y-4">
      <BacklogsBreadCrumb />
      <BacklogsList />
    </div>
  );
};
