"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/features/common/components/spinner";
import { useProjectWorkItemDetails } from "@/features/projects/apis/use-project-work-item-details";
import useSelectedOrganizationStore from "@/stores/selected-organization-store";

import { TWorkItemKeyMap } from "../work-item-schemas";
import { CreateWorkItemBreadcrumb } from "./create-work-item-breadcrumb";
import { WorkItemForm } from "./work-item-form";
import { WorkItemsList } from "./work-items-list";

type WorkItemTypeKeys = TWorkItemKeyMap | "ALL" | undefined;

export const WorkItemDetails = () => {
  const { projectId, sprintId, workItemId } = useParams<{
    projectId: string;
    sprintId: string;
    workItemId: string;
  }>();
  const { selectedOrganization } = useSelectedOrganizationStore();
  const searchParams = useSearchParams();
  const filterType = searchParams.get("type") as WorkItemTypeKeys;
  const workItem = useProjectWorkItemDetails({
    projectId,
    workItemId,
    filterType: filterType || "ALL",
  });
  const router = useRouter();

  const onFilterType = (type: TWorkItemKeyMap) => {
    router.push(
      `/${selectedOrganization?.name}/${projectId}/${sprintId}/work-items/${workItemId}?type=${type}`
    );
  };

  if (workItem.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mb-6 space-y-6">
      <CreateWorkItemBreadcrumb customTitle={workItem.data?.title} />
      <Card>
        <CardHeader>
          <CardTitle>Work Item Details</CardTitle>
        </CardHeader>
        <CardContent>
          <WorkItemForm data={workItem.data} />
        </CardContent>
      </Card>

      {workItem.data?.type === "STORY" && (
        <WorkItemsList
          data={workItem.data?.childWorkItems || []}
          onFilterType={onFilterType}
          defaultFilterValue={filterType}
        />
      )}
    </div>
  );
};
