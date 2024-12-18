"use client";

import { useState } from "react";

import { Spinner } from "@/features/common/components/spinner";
import { OrganizationProjectsDropdown } from "@/features/organizations/components/organization-projects-dropdown";
import { useProjectBacklogs } from "@/features/projects/apis/use-project-backlogs";

import { WorkItemsList } from "./work-items-list";

export const BacklogsList = () => {
  const [projectId, setProjectId] = useState<string>();
  const workItems = useProjectBacklogs(projectId);
  const onValueChangeHandler = (projectId: string) => setProjectId(projectId);

  return (
    <div className="space-y-4">
      <OrganizationProjectsDropdown
        onValueChangeHandler={onValueChangeHandler}
      />

      {workItems.isLoading ? (
        <Spinner />
      ) : (
        <WorkItemsList data={workItems.data || []} />
      )}
    </div>
  );
};
