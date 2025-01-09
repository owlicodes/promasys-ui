"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useProjectDetails } from "@/features/projects/apis/use-project-details";
import { useSprintDetails } from "@/features/sprints/apis/use-sprint-details";
import useSelectedOrganizationStore from "@/stores/selected-organization-store";

export const CreateWorkItemBreadcrumb = ({
  customTitle,
}: {
  customTitle?: string;
}) => {
  const { selectedOrganization } = useSelectedOrganizationStore();
  const { projectId, sprintId } = useParams<{
    projectId: string;
    sprintId: string;
  }>();
  const project = useProjectDetails(projectId);
  const sprint = useSprintDetails(projectId, sprintId, "ALL");

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
            <Link href={`/${selectedOrganization?.name}/${project.data?.id}`}>
              {project.data?.name}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {sprintId && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/${selectedOrganization?.name}/${project.data?.id}/${sprint.data?.id}`}
                >
                  {sprint.data?.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage>
            {customTitle ? customTitle : "Create Work Item"}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
