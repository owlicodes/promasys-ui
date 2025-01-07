"use client";

import { useSession } from "next-auth/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/features/common/components/data-table";
import { Spinner } from "@/features/common/components/spinner";

import { useUserInvites } from "../apis/use-user-invites";
import { inviteColumns } from "./invite-columns";

export const InvitesList = () => {
  const session = useSession();
  const invites = useUserInvites(session.data?.user.email);

  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Invites</CardTitle>
        </CardHeader>
        <CardContent>
          {invites.isLoading ? (
            <Spinner />
          ) : (
            <DataTable columns={inviteColumns} data={invites.data || []} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
