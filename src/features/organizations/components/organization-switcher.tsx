"use client";

import { Route } from "next";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { Check, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react";
import { useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganizations } from "@/features/organizations/apis/use-organizations";
import useSelectedOrganizationStore from "@/stores/selected-organization-store";

import { getSelectedOrganization } from "../helpers";

export const OrganizationSwitcher = () => {
  const { organization } = useParams<{ organization: string }>();
  const router = useRouter();
  const session = useSession();
  const organizations = useOrganizations(session.data?.user.id);
  const selectedOrganization = getSelectedOrganization(
    organization,
    organizations.data
  );
  const { setSelectedOrganization } = useSelectedOrganizationStore();

  useEffect(() => {
    setSelectedOrganization(selectedOrganization);
  }, [setSelectedOrganization, selectedOrganization]);

  const onSwitchHandler = (name: string) => router.push(name as Route);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="flex items-center data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-brand text-white">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="flex w-full flex-col gap-0.5 leading-none">
                <span className="mb-1 font-bold text-brand">promasys</span>
                {organizations.isLoading ? (
                  <Skeleton className="h-4 w-full" />
                ) : (
                  <span className="">{selectedOrganization?.name}</span>
                )}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {organizations.data?.map((organization) => (
              <DropdownMenuItem
                key={organization.id}
                onSelect={() => onSwitchHandler(organization.name)}
              >
                {organization.name}{" "}
                {organization.name === selectedOrganization?.name && (
                  <Check className="ml-auto" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
