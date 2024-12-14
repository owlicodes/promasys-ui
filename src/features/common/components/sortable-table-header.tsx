import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";

export const SortableTableHeader = <T,>({
  column,
  title,
}: {
  column: Column<T, unknown>;
  title: string;
}) => {
  return (
    <Button
      variant="ghost"
      className="w-full p-0"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      <div className="flex w-full items-center">
        <span>{title}</span>
        {column.getIsSorted() === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
        {column.getIsSorted() === "desc" && (
          <ArrowDown className="ml-2 h-4 w-4" />
        )}
      </div>
    </Button>
  );
};
