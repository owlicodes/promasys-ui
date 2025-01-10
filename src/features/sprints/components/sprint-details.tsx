"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/features/common/components/spinner";
import { useProjectDetails } from "@/features/projects/apis/use-project-details";
import { CreateNewWorkItem } from "@/features/work-items/components/create-new-work-item";
import { WorkItemsList } from "@/features/work-items/components/work-items-list";
import { TWorkItemKeyMap } from "@/features/work-items/work-item-schemas";
import useSelectedOrganizationStore from "@/stores/selected-organization-store";

import { useSprintDetails } from "../apis/use-sprint-details";
import { SPRINT_STATUS_MAP } from "../utils";
import { SprintDetailsBreadcrumb } from "./sprint-details-breadcrumb";

type WorkItemTypeKeys = TWorkItemKeyMap | "ALL" | undefined;

export const SprintDetails = () => {
  const { projectId, sprintId } = useParams<{
    projectId: string;
    sprintId: string;
  }>();
  const { selectedOrganization } = useSelectedOrganizationStore();
  const searchParams = useSearchParams();
  const filterType = searchParams.get("type") as WorkItemTypeKeys;
  const project = useProjectDetails(projectId);
  const sprint = useSprintDetails(projectId, sprintId, filterType || "ALL");
  const router = useRouter();

  const onFilterType = (type: TWorkItemKeyMap) => {
    router.push(
      `/${selectedOrganization?.name}/${projectId}/${sprintId}?type=${type}`
    );
  };

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
        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
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

      <WorkItemsList
        data={sprint.data.workItems || []}
        onFilterType={onFilterType}
        defaultFilterValue={filterType}
      />
    </div>
  );
};
