"use client";

import { Route } from "next";
import Link from "next/link";
import { useParams } from "next/navigation";

import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonVariants } from "@/features/common/types";
import useSelectedOrganizationStore from "@/stores/selected-organization-store";

export const CreateNewWorkItem = ({
  variant = "default",
}: {
  variant?: ButtonVariants;
}) => {
  const { selectedOrganization } = useSelectedOrganizationStore();
  const { projectId, sprintId } = useParams<{
    projectId: string;
    sprintId: string;
  }>();
  const initialHref = `/${selectedOrganization?.name}/${projectId}`;
  const href = `${initialHref}/${sprintId ? `${sprintId}/create-work-item` : "create-work-item"}`;

  return (
    <Button variant={variant} className="mt-4 w-full p-0 md:w-fit">
      <Link href={href as Route} className="flex h-9 items-center gap-2 px-4">
        <PlusCircle />
        <span>Create New Work Item</span>
      </Link>
    </Button>
  );
};
