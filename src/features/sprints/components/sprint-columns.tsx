"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TSprint } from "../sprint-schema";

/* eslint-disable react-hooks/rules-of-hooks */
export const sprintColumns: ColumnDef<TSprint>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const project = row.original;
  //     const { setDialogConfig } = useDialogConfigStore();
  //     const session = useSession();
  //     const deleteProject = useDeleteProject(
  //       session.data?.user.id,
  //       project.organizationId
  //     );
  //     const { toast } = useToast();

  //     const deleteCallback = () => {
  //       deleteProject.mutate(project.id, {
  //         onSuccess: () => {
  //           toast({
  //             title: "Delete Project",
  //           });
  //           setDialogConfig(undefined);
  //         },
  //         onError: (error) => {
  //           toast({
  //             title: error.message,
  //             variant: "destructive",
  //           });
  //           setDialogConfig(undefined);
  //         },
  //       });
  //     };

  //     const showEditProjectForm = () => {
  //       setDialogConfig({
  //         open: true,
  //         title: `Update ${project.name}`,
  //         description: "",
  //         content: <ProjectForm data={project} />,
  //       });
  //     };

  //     const showDeleteProjectConfirmation = () => {
  //       setDialogConfig({
  //         open: true,
  //         title: "Delete Project",
  //         description: project.name,
  //         content: <DeleteContent deleteCallback={deleteCallback} />,
  //       });
  //     };

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={showEditProjectForm}
  //             className="cursor-pointer"
  //           >
  //             <div className="flex items-center gap-2">
  //               <Edit2 className="h-4 w-4" />
  //               <span>Edit</span>
  //             </div>
  //           </DropdownMenuItem>
  //           <DropdownMenuItem
  //             className="cursor-pointer"
  //             onClick={showDeleteProjectConfirmation}
  //           >
  //             <div className="flex items-center gap-2 text-red-500">
  //               <Trash className="h-4 w-4" />
  //               <span>Delete</span>
  //             </div>
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
