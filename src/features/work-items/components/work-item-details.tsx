"use client";

import { useParams } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { useProjectWorkItemDetails } from "@/features/projects/apis/use-project-work-item-details";

import { CreateWorkItemBreadcrumb } from "./create-work-item-breadcrumb";
import { WorkItemForm } from "./work-item-form";

export const WorkItemDetails = () => {
  const { projectId, workItemId } = useParams<{
    projectId: string;
    workItemId: string;
  }>();
  const workItem = useProjectWorkItemDetails({ projectId, workItemId });

  return (
    <div className="space-y-6">
      <CreateWorkItemBreadcrumb />
      <Card>
        <CardContent>
          <WorkItemForm data={workItem.data} />
        </CardContent>
      </Card>
    </div>
  );
};
