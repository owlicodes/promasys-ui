"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Edit2, MoreHorizontal, Trash } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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

import { useDeleteSprint } from "../apis/use-delete-sprint";
import { TSprint } from "../sprint-schema";
import { SPRINT_STATUS_MAP } from "../utils";
import { SprintForm } from "./sprint-form";

/* eslint-disable react-hooks/rules-of-hooks */
export const sprintColumns: ColumnDef<TSprint>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      return <span>{format(row.original.startDate, "PPP")}</span>;
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      return <span>{format(row.original.endDate, "PPP")}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge className={`${SPRINT_STATUS_MAP[row.original.status].color}`}>
          {SPRINT_STATUS_MAP[row.original.status].label}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const sprint = row.original;
      const { setDialogConfig } = useDialogConfigStore();
      const deleteSprint = useDeleteSprint(row.original.projectId);
      const { toast } = useToast();

      const deleteCallback = () => {
        deleteSprint.mutate(
          {
            projectId: row.original.projectId,
            sprintId: row.original.id,
          },
          {
            onSuccess: () => {
              toast({
                title: "Sprint deleted.",
              });
              setDialogConfig(undefined);
            },
            onError: (error) => {
              toast({
                title: error.message,
                variant: "destructive",
              });
              setDialogConfig(undefined);
            },
          }
        );
      };

      const showEditSprintForm = () => {
        setDialogConfig({
          open: true,
          title: `Update ${sprint.name}`,
          description: "",
          content: <SprintForm data={sprint} />,
        });
      };

      const showDeleteSprintConfirmation = () => {
        setDialogConfig({
          open: true,
          title: "Delete Sprint",
          description: sprint.name,
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
