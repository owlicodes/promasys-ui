"use client";

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TProject } from "@/features/projects/project-schemas";
import useSelectedOrganizationStore from "@/stores/selected-organization-store";

import { TSprint } from "../sprint-schema";

export const SprintDetailsBreadcrumb = ({
  project,
  sprint,
}: {
  project: TProject;
  sprint: TSprint;
}) => {
  const { selectedOrganization } = useSelectedOrganizationStore();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/${selectedOrganization?.name}`}>
              {selectedOrganization?.name}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/${selectedOrganization?.name}/${project.id}`}>
              {project.name}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{sprint.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
