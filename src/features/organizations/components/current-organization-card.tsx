"use client";

import { useParams } from "next/navigation";

import { format } from "date-fns";
import { CalendarDays, Mail } from "lucide-react";
import { useSession } from "next-auth/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/features/common/components/spinner";

import { useOrganizations } from "../apis/use-organizations";
import { getSelectedOrganization } from "../helpers";

export const CurrentOrganizationCard = () => {
  const { organization } = useParams<{ organization: string }>();
  const session = useSession();
  const organizations = useOrganizations(session.data?.user.id);
  const selectedOrganization = getSelectedOrganization(
    organization,
    organizations.data
  );

  if (organizations.isLoading) {
    return <Spinner />;
  }

  if (!selectedOrganization) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {selectedOrganization.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-sm text-muted-foreground">
          {selectedOrganization.description}
        </p>
        <div className="flex items-center space-x-2 text-sm">
          <CalendarDays className="h-4 w-4" />
          <span>
            Created on: {format(selectedOrganization.createdAt, "PPP")}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Mail className="h-4 w-4" />
          <span>Owner: {selectedOrganization.owner.email}</span>
        </div>
      </CardContent>
    </Card>
  );
};
