"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit2, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteContent } from "@/features/common/components/delete-content";
import { useToast } from "@/hooks/use-toast";
import useDialogConfigStore from "@/stores/dialog-store";

import { TWorkItem } from "../work-item-schemas";

/* eslint-disable react-hooks/rules-of-hooks */
export const workItemColumns: ColumnDef<TWorkItem>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const workItem = row.original;
      const { setDialogConfig } = useDialogConfigStore();
      const { toast } = useToast();

      const deleteCallback = () => {
        // deleteSprint.mutate(
        //   {
        //     projectId: row.original.projectId,
        //     sprintId: row.original.id,
        //   },
        //   {
        //     onSuccess: () => {
        //       toast({
        //         title: "Sprint deleted.",
        //       });
        //       setDialogConfig(undefined);
        //     },
        //     onError: (error) => {
        //       toast({
        //         title: error.message,
        //         variant: "destructive",
        //       });
        //       setDialogConfig(undefined);
        //     },
        //   }
        // );
      };

      const showEditSprintForm = () => {
        console.log("navigate to edit work item form");
      };

      const showDeleteSprintConfirmation = () => {
        setDialogConfig({
          open: true,
          title: "Delete Work Item",
          description: workItem.title,
          content: <DeleteContent deleteCallback={deleteCallback} />,
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={showEditSprintForm}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Edit2 className="h-4 w-4" />
                <span>Edit</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={showDeleteSprintConfirmation}
            >
              <div className="flex items-center gap-2 text-red-500">
                <Trash className="h-4 w-4" />
                <span>Delete</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
