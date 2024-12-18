"use client";

import { useSession } from "next-auth/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSelectedOrganizationStore from "@/stores/selected-organization-store";

import { useProjectsByUserAndOrg } from "../../projects/apis/use-user-org-projects";

export const OrganizationProjectsDropdown = ({
  onValueChangeHandler,
}: {
  onValueChangeHandler: (projectId: string) => void;
}) => {
  const session = useSession();
  const { selectedOrganization } = useSelectedOrganizationStore();
  const projects = useProjectsByUserAndOrg(
    session.data?.user.id,
    selectedOrganization?.id
  );

  const onValueChange = (projectId: string) => onValueChangeHandler(projectId);

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="max-w-sm">
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {projects.data?.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              {project.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
