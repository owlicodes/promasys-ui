"use client";

import { useState } from "react";

import { OrganizationProjectsDropdown } from "@/features/organizations/components/organization-projects-dropdown";
import { useProjectWorkItems } from "@/features/projects/apis/use-project-work-items";

import { WorkItemsList } from "./work-items-list";

export const BacklogsList = () => {
  const [projectId, setProjectId] = useState<string>();
  const workItems = useProjectWorkItems(projectId, true);
  const onValueChangeHandler = (projectId: string) => setProjectId(projectId);

  return (
    <div className="space-y-4">
      <OrganizationProjectsDropdown
        onValueChangeHandler={onValueChangeHandler}
      />

      <WorkItemsList data={workItems.data || []} />
    </div>
  );
};
