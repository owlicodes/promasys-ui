"use client";

import { useSession } from "next-auth/react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/features/common/components/data-table";
import { Spinner } from "@/features/common/components/spinner";
import { useProjectsByUserAndOrg } from "@/features/projects/apis/use-user-org-projects";
import useSelectedOrganizationStore from "@/stores/selected-organization-store";

import { organizationProjectColumns } from "./organization-project-columns";

export const OrganizationProjectsList = () => {
  const session = useSession();
  const { selectedOrganization } = useSelectedOrganizationStore();
  const projects = useProjectsByUserAndOrg(
    session.data?.user.id,
    selectedOrganization?.id
  );

  if (projects.isLoading) {
    return <Spinner />;
  }

  if (!selectedOrganization) {
    return null;
  }

  return (
    <Card className="space-y-6 p-6">
      <CardTitle className="text-2xl font-bold">
        Organization Projects
      </CardTitle>
      <CardContent>
        <DataTable
          columns={organizationProjectColumns}
          data={projects.data || []}
        />
      </CardContent>
    </Card>
  );
};
