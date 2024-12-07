import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/features/common/components/data-table";

import { TWorkItem } from "../work-item-schemas";
import { workItemColumns } from "./work-item-columns";

export const WorkItemsList = ({ data }: { data: TWorkItem[] }) => {
  return (
    <Card className="space-y-6 p-6">
      <CardTitle className="text-2xl font-bold">Work Items</CardTitle>
      <CardContent>
        <DataTable columns={workItemColumns} data={data} />
      </CardContent>
    </Card>
  );
};
