"use client";

import { useParams, useRouter } from "next/navigation";

import { format } from "date-fns";
import { CalendarDays, Edit, Mail, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteContent } from "@/features/common/components/delete-content";
import { Spinner } from "@/features/common/components/spinner";
import { useToast } from "@/hooks/use-toast";
import useDialogConfigStore from "@/stores/dialog-store";

import { useDeleteOrganization } from "../apis/use-delete-organization";
import { useOrganizations } from "../apis/use-organizations";
import { getSelectedOrganization } from "../helpers";
import { OrganizationForm } from "./organization-form";

export const CurrentOrganizationCard = () => {
  const { organization } = useParams<{ organization: string }>();
  const session = useSession();
  const organizations = useOrganizations(session.data?.user.id);
  const selectedOrganization = getSelectedOrganization(
    organization,
    organizations.data
  );
  const { setDialogConfig } = useDialogConfigStore();
  const deleteOrganization = useDeleteOrganization(session.data?.user.id);
  const { toast } = useToast();
  const router = useRouter();

  const showOrganizationForm = () =>
    setDialogConfig({
      open: true,
      title: "Edit Organization",
      description: "",
      content: <OrganizationForm data={selectedOrganization} />,
    });

  const deleteCallback = () => {
    if (selectedOrganization) {
      deleteOrganization.mutate(selectedOrganization.id, {
        onSuccess: () => {
          toast({
            title: "Organization deleted.",
          });
          router.push("/default");
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
    }
  };

  const showDeleteOrganizationConfirmation = () => {
    if (selectedOrganization) {
      setDialogConfig({
        open: true,
        title: "Delete Organization",
        description: selectedOrganization.name,
        content: <DeleteContent deleteCallback={deleteCallback} />,
      });
    }
  };

  if (organizations.isLoading) {
    return <Spinner />;
  }

  if (!selectedOrganization) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">
          {selectedOrganization.name}
        </CardTitle>

        <div>
          <Button variant="ghost" size="icon" onClick={showOrganizationForm}>
            <Edit />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={showDeleteOrganizationConfirmation}
          >
            <Trash2 className="text-red-500" />
          </Button>
        </div>
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
