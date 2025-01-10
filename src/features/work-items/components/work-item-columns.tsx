"use client";

import { Route } from "next";
import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";

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
import { SortableTableHeader } from "@/features/common/components/sortable-table-header";
import { useToast } from "@/hooks/use-toast";
import useDialogConfigStore from "@/stores/dialog-store";
import useSelectedOrganizationStore from "@/stores/selected-organization-store";

import { useDeleteWorkItem } from "../apis/use-delete-work-item";
import { WORK_ITEM_STATUS_MAP, WORK_ITEM_TYPES_MAP } from "../utils";
import { TWorkItem } from "../work-item-schemas";

/* eslint-disable react-hooks/rules-of-hooks */
export const workItemColumns: ColumnDef<TWorkItem>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <SortableTableHeader column={column} title="Title" />;
    },
    cell: ({ row }) => {
      const { selectedOrganization } = useSelectedOrganizationStore();
      const rootUrl = `/${selectedOrganization?.name}/${row.original.projectId}`;
      const withSprintUrl = row.original.sprintId
        ? `${rootUrl}/${row.original.sprintId}`
        : rootUrl;
      const finalUrl = `${withSprintUrl}/work-items/${row.original.id}`;

      return (
        <Link
          href={finalUrl as Route}
          className="font-semibold text-brand underline"
        >
          {row.original.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "sprint.name",
    header: ({ column }) => {
      return <SortableTableHeader column={column} title="Sprint" />;
    },
    cell: ({ row }) => {
      const workItem = row.original;

      if (!workItem.sprint?.name) return null;

      return <span>{workItem.sprint.name}</span>;
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return <SortableTableHeader column={column} title="Type" />;
    },
    cell: ({ row }) => {
      const workItem = row.original;

      return (
        <Badge className={WORK_ITEM_TYPES_MAP[workItem.type].color}>
          {WORK_ITEM_TYPES_MAP[workItem.type].label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <SortableTableHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      const workItem = row.original;

      return (
        <Badge className={WORK_ITEM_STATUS_MAP[workItem.status].color}>
          {WORK_ITEM_STATUS_MAP[workItem.status].label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "storyPoint",
    header: ({ column }) => {
      return <SortableTableHeader column={column} title="Story Point" />;
    },
    cell: ({ row }) => {
      const workItem = row.original;

      if (workItem.type !== "STORY" && workItem.type !== "BUG") {
        return null;
      }

      return <span>{workItem.storyPoint}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const workItem = row.original;
      const { setDialogConfig } = useDialogConfigStore();
      const deleteWorkItem = useDeleteWorkItem();
      const { toast } = useToast();

      const deleteCallback = () => {
        deleteWorkItem.mutate(
          {
            projectId: workItem.projectId,
            workItemId: workItem.id,
          },
          {
            onSuccess: () => {
              toast({
                title: "Work item deleted.",
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
