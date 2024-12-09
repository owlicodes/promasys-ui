import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/features/common/components/data-table";

import { TWorkItem } from "../work-item-schemas";
import { workItemColumns } from "./work-item-columns";

export const WorkItemsList = ({ data }: { data: TWorkItem[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Work Items</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={workItemColumns} data={data} />
      </CardContent>
    </Card>
  );
};
