"use client";

import { Route } from "next";
import Link from "next/link";

import { Box, ChevronUp, Home, User2 } from "lucide-react";
import { useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import useSelectedOrganizationStore from "@/stores/selected-organization-store";

import { OrganizationSwitcher } from "../../organizations/components/organization-switcher";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Backlogs",
    url: "/backlogs",
    icon: Box,
  },
];

export const AppSidebar = () => {
  const session = useSession();
  const { selectedOrganization } = useSelectedOrganizationStore();

  return (
    <Sidebar>
      <SidebarHeader>
        <OrganizationSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.title === "Backlogs" ? (
                      <Link
                        href={
                          `/${selectedOrganization?.name}${item.url}` as Route
                        }
                        className="flex items-center"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    ) : (
                      <Link
                        href={item.url as Route}
                        className="flex items-center"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {session.data?.user.email}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <SignOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
