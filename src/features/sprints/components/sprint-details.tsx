"use client";

import { useParams } from "next/navigation";

import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/features/common/components/spinner";
import { useProjectDetails } from "@/features/projects/apis/use-project-details";
import { CreateNewWorkItem } from "@/features/work-items/components/create-new-work-item";
import { WorkItemsList } from "@/features/work-items/components/work-items-list";

import { useSprintDetails } from "../apis/use-sprint-details";
import { SPRINT_STATUS_MAP } from "../utils";
import { SprintDetailsBreadcrumb } from "./sprint-details-breadcrumb";

export const SprintDetails = () => {
  const { projectId, sprintId } = useParams<{
    projectId: string;
    sprintId: string;
  }>();
  const project = useProjectDetails(projectId);
  const sprint = useSprintDetails(projectId, sprintId);

  if (project.isLoading || sprint.isLoading) {
    return <Spinner />;
  }

  if (!project.data) {
    return (
      <p>Unable to fetch project details, please try reloading the page.</p>
    );
  }

  if (!sprint.data) {
    return (
      <p>Unable to fetch sprint details, please try reloading the page.</p>
    );
  }

  return (
    <div className="mb-6 space-y-6">
      <SprintDetailsBreadcrumb project={project.data} sprint={sprint.data} />

      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Sprint Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Sprint Name:</p>
            <p>{sprint.data.name}</p>
          </div>
          <div>
            <p className="font-semibold">Status:</p>
            <Badge className={SPRINT_STATUS_MAP[sprint.data.status].color}>
              {SPRINT_STATUS_MAP[sprint.data.status].label}
            </Badge>
          </div>
          <div>
            <p className="font-semibold">Start Date:</p>
            <p>{format(sprint.data.startDate, "PPP")}</p>
          </div>
          <div>
            <p className="font-semibold">End Date:</p>
            <p>{format(sprint.data.endDate, "PPP")}</p>
          </div>
        </div>

        <CreateNewWorkItem />
      </div>

      <WorkItemsList data={sprint.data.workItems || []} />
    </div>
  );
};
