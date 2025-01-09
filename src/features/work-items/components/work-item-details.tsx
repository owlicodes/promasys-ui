"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/features/common/components/spinner";
import { useProjectWorkItemDetails } from "@/features/projects/apis/use-project-work-item-details";

import { TWorkItemKeyMap } from "../work-item-schemas";
import { CreateWorkItemBreadcrumb } from "./create-work-item-breadcrumb";
import { WorkItemForm } from "./work-item-form";
import { WorkItemsList } from "./work-items-list";

type WorkItemTypeKeys = TWorkItemKeyMap | "ALL";

export const WorkItemDetails = () => {
  const { projectId, workItemId } = useParams<{
    projectId: string;
    workItemId: string;
  }>();
  const [filterType, setFilterType] = useState<WorkItemTypeKeys>("ALL");
  const workItem = useProjectWorkItemDetails({
    projectId,
    workItemId,
    filterType,
  });

  const onFilterType = (type: TWorkItemKeyMap) => setFilterType(type);

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
        />
      )}
    </div>
  );
};
