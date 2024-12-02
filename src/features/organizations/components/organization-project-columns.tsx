"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit2, MoreHorizontal, Trash } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteContent } from "@/features/common/components/delete-content";
import { ProjectForm } from "@/features/projects/components/project-form";
import { TProject } from "@/features/projects/project-schemas";
import { useToast } from "@/hooks/use-toast";
import useDialogConfigStore from "@/stores/dialog-store";

import { useDeleteProject } from "../apis/use-delete-project";

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
      const session = useSession();
      const deleteProject = useDeleteProject(
        session.data?.user.id,
        project.organizationId
      );
      const { toast } = useToast();

      const deleteCallback = () => {
        deleteProject.mutate(project.id, {
          onSuccess: () => {
            toast({
              title: "Delete Project",
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
        });
      };

      const showEditProjectForm = () => {
        setDialogConfig({
          open: true,
          title: `Update ${project.name}`,
          description: "",
          content: <ProjectForm data={project} />,
        });
      };

      const showDeleteProjectConfirmation = () => {
        setDialogConfig({
          open: true,
          title: "Delete Project",
          description: project.name,
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
              onClick={showEditProjectForm}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Edit2 className="h-4 w-4" />
                <span>Edit</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={showDeleteProjectConfirmation}
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
