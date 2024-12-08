import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateWorkItemBreadcrumb } from "@/features/work-items/components/create-work-item-breadcrumb";
import { WorkItemForm } from "@/features/work-items/components/work-item-form";

export default function CreateWorkItem() {
  return (
    <div className="mb-6 space-y-6">
      <CreateWorkItemBreadcrumb />
      <Card>
        <CardHeader>
          <CardTitle>Create Work Item</CardTitle>
        </CardHeader>
        <CardContent>
          <WorkItemForm />
        </CardContent>
      </Card>
    </div>
  );
}
