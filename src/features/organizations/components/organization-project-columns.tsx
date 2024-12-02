/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit2, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProjectForm } from "@/features/projects/components/project-form";
import { TProject } from "@/features/projects/project-schemas";
import useDialogConfigStore from "@/stores/dialog-store";

/* eslint-disable react-hooks/rules-of-hooks */

/* eslint-disable react-hooks/rules-of-hooks */

/* eslint-disable react-hooks/rules-of-hooks */

export const organizationProjectColumns: ColumnDef<TProject>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;
      const { setDialogConfig } = useDialogConfigStore();

      const showEditProjectForm = () => {
        setDialogConfig({
          open: true,
          title: `Update ${project.name}`,
          description: "",
          content: <ProjectForm data={project} />,
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
              onClick={showEditProjectForm}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Edit2 className="h-4 w-4" />
                <span>Edit Project</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
