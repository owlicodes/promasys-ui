import { Card, CardContent } from "@/components/ui/card";
import { CreateWorkItemBreadcrumb } from "@/features/work-items/components/create-work-item-breadcrumb";
import { WorkItemForm } from "@/features/work-items/components/work-item-form";

export default function SprintWorkItemDetails() {
  return (
    <div className="space-y-6">
      <CreateWorkItemBreadcrumb />
      <Card>
        <CardContent>
          <WorkItemForm />
        </CardContent>
      </Card>
    </div>
  );
}
