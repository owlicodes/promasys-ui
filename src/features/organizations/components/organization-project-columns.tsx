"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TProject } from "@/features/projects/project-schemas";

export const organizationProjectColumns: ColumnDef<TProject>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];
