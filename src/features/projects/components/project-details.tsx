"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import { format } from "date-fns";

import { Spinner } from "@/features/common/components/spinner";
import { CreateNewSprintButton } from "@/features/sprints/components/create-new-sprint-button";
import { SprintsList } from "@/features/sprints/components/sprints-list";
import { CreateNewWorkItem } from "@/features/work-items/components/create-new-work-item";
import { WorkItemsList } from "@/features/work-items/components/work-items-list";
import { TWorkItemKeyMap } from "@/features/work-items/work-item-schemas";
import useSelectedOrganizationStore from "@/stores/selected-organization-store";

import { useProjectDetails } from "../apis/use-project-details";
import { useProjectSprints } from "../apis/use-project-sprints";
import { useProjectWorkItems } from "../apis/use-project-work-items";
import { ProjectDetailsBreadcrumb } from "./project-details-breadcrumb";

type WorkItemTypeKeys = TWorkItemKeyMap | "ALL" | undefined;

export const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { selectedOrganization } = useSelectedOrganizationStore();
  const searchParams = useSearchParams();
  const filterType = searchParams.get("type") as WorkItemTypeKeys;
  const project = useProjectDetails(projectId);
  const sprints = useProjectSprints(projectId);
  const workItems = useProjectWorkItems(projectId, filterType || "ALL");
  const router = useRouter();

  const onFilterType = (type: TWorkItemKeyMap) => {
    router.push(`/${selectedOrganization?.name}/${projectId}?type=${type}`);
  };

  if (project.isLoading) {
    return <Spinner />;
  }

  if (!project.data) {
    return (
      <p>Unable to fetch project details, please try reloading the page.</p>
    );
  }

  return (
    <div className="mb-6 space-y-6">
      <ProjectDetailsBreadcrumb projectName={project.data.name} />

      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Project Information</h2>
        <div className="space-y-4 md:grid md:gap-4 md:space-y-0">
          <div>
            <p className="font-semibold">Project Name:</p>
            <p>{project.data.name}</p>
          </div>
          <div>
            <p className="font-semibold">Owner:</p>
            <p>{project.data.owner.email}</p>
          </div>
          <div className="col-span-2">
            <p className="font-semibold">Description:</p>
            <p>{project.data.description}</p>
          </div>
          <div>
            <p className="font-semibold">Date Created:</p>
            <p>{format(project.data.createdAt, "PPP")}</p>
          </div>
        </div>
        <div className="md:flex md:gap-4">
          <CreateNewSprintButton />
          <CreateNewWorkItem variant="outline" />
        </div>
      </div>

      <SprintsList data={sprints.data || []} />

      <WorkItemsList
        data={workItems.data || []}
        onFilterType={onFilterType}
        defaultFilterValue={filterType}
      />
    </div>
  );
};
