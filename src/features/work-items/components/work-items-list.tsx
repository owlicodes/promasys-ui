import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/features/common/components/data-table";

import { TWorkItem, TWorkItemKeyMap } from "../work-item-schemas";
import { FilterWorkItemStatusSelect } from "./filter-work-items-status-select";
import { workItemColumns } from "./work-item-columns";

type WorkItemsListProps = {
  defaultFilterValue?: TWorkItemKeyMap | "ALL" | undefined;
  data: TWorkItem[];
  onFilterType?: (type: TWorkItemKeyMap) => void;
};

export const WorkItemsList = ({
  defaultFilterValue,
  data,
  onFilterType,
}: WorkItemsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Work Items</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex w-full justify-end">
          <FilterWorkItemStatusSelect
            onFilterType={onFilterType}
            defaultValue={defaultFilterValue}
          />
        </div>
        <DataTable columns={workItemColumns} data={data} />
      </CardContent>
    </Card>
  );
};
