"use client";

import { useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/features/common/components/spinner";
import { useProjectWorkItemDetails } from "@/features/projects/apis/use-project-work-item-details";

import { CreateWorkItemBreadcrumb } from "./create-work-item-breadcrumb";
import { WorkItemForm } from "./work-item-form";
import { WorkItemsList } from "./work-items-list";

export const WorkItemDetails = () => {
  const { projectId, workItemId } = useParams<{
    projectId: string;
    workItemId: string;
  }>();
  const workItem = useProjectWorkItemDetails({ projectId, workItemId });

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

      {workItem.data?.childWorkItems &&
        workItem.data.childWorkItems.length > 0 && (
          <WorkItemsList data={workItem.data?.childWorkItems} />
        )}
    </div>
  );
};
