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
import useDialogConfigStore from "@/stores/dialog-store";
import useSelectedOrganizationStore from "@/stores/selected-organization-store";

import { WORK_ITEM_STATUS_MAP, WORK_ITEM_TYPES_MAP } from "../utils";
import { TWorkItem } from "../work-item-schemas";

/* eslint-disable react-hooks/rules-of-hooks */
export const workItemColumns: ColumnDef<TWorkItem>[] = [
  {
    accessorKey: "title",
    header: "Title",
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
    accessorKey: "type",
    header: "Type",
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
    header: "Status",
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
    header: "Story Point",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const workItem = row.original;
      const { setDialogConfig } = useDialogConfigStore();
      // const { toast } = useToast();

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
