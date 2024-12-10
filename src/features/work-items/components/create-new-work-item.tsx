"use client";

import { Route } from "next";
import Link from "next/link";
import { useParams } from "next/navigation";

import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import useSelectedOrganizationStore from "@/stores/selected-organization-store";

export const CreateNewWorkItem = () => {
  const { selectedOrganization } = useSelectedOrganizationStore();
  const { projectId, sprintId } = useParams<{
    projectId: string;
    sprintId: string;
  }>();
  const initialHref = `/${selectedOrganization?.name}/${projectId}`;
  const href = `${initialHref}/${sprintId ? `${sprintId}/create-work-item` : "create-work-item"}`;

  return (
    <Button variant="outline" className="mt-4">
      <Link href={href as Route} className="flex items-center gap-2">
        <PlusCircle />
        <span>Create New Work Item</span>
      </Link>
    </Button>
  );
};
