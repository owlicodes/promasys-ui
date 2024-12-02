import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

import { getServerSession } from "next-auth";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/common/components/app-sidebar";
import { authOptions } from "@/lib/next-auth-config";

export default async function OrganizationLayout({
  children,
}: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />

        <div className="min-h-[calc(100vh-60px)] px-8">{children}</div>
      </main>
    </SidebarProvider>
  );
}
