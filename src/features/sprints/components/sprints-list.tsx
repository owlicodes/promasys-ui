import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/features/common/components/data-table";

import { TSprint } from "../sprint-schema";
import { sprintColumns } from "./sprint-columns";

export const SprintsList = ({ data }: { data: TSprint[] }) => {
  return (
    <Card className="space-y-6 p-6">
      <CardTitle className="text-2xl font-bold">Project Sprints</CardTitle>
      <CardContent>
        <DataTable columns={sprintColumns} data={data} />
      </CardContent>
    </Card>
  );
};
