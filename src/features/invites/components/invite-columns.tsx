"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Check, MoreHorizontal, Trash, X } from "lucide-react";
import { useSession } from "next-auth/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeclineInviteContent } from "@/features/common/components/decline-invite-content";
import { DeleteContent } from "@/features/common/components/delete-content";
import { SortableTableHeader } from "@/features/common/components/sortable-table-header";
import { useToast } from "@/hooks/use-toast";
import useDialogConfigStore from "@/stores/dialog-store";

import { useDeclineInvite } from "../apis/use-decline-invite";
import { useDeleteInvite } from "../apis/use-delete-invite";
import { TInvite } from "../invite-schemas";
import { INVITE_STATUS_MAP } from "../utils";

/* eslint-disable react-hooks/rules-of-hooks */
export const inviteColumns: ColumnDef<TInvite>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <SortableTableHeader column={column} title="Email" />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <SortableTableHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      const invite = row.original;

      return (
        <Badge className={INVITE_STATUS_MAP[invite.status].color}>
          {INVITE_STATUS_MAP[invite.status].label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "organization.name",
    header: ({ column }) => {
      return <SortableTableHeader column={column} title="Organization" />;
    },
  },
  {
    accessorKey: "createdBy.email",
    header: ({ column }) => {
      return <SortableTableHeader column={column} title="Invited By" />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invite = row.original;
      const session = useSession();

      const { setDialogConfig } = useDialogConfigStore();
      const declineInvite = useDeclineInvite(session.data?.user.email);
      const deleteInvite = useDeleteInvite(session.data?.user.email);
      const { toast } = useToast();

      const deleteCallback = () => {
        deleteInvite.mutate(invite.id, {
          onSuccess: () => {
            toast({
              title: "Invite deleted.",
            });
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
      };

      const showDeleteSprintConfirmation = () => {
        setDialogConfig({
          open: true,
          title: "Delete Invite",
          description: invite.organization.name,
          content: <DeleteContent deleteCallback={deleteCallback} />,
        });
      };

      const declineCallback = () => {
        declineInvite.mutate(invite.id, {
          onSuccess: () => {
            toast({
              title: "Invite declined.",
            });
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
      };

      const showDeclineInviteConfirmation = () => {
        setDialogConfig({
          open: true,
          title: "Decline Invite",
          description: invite.organization.name,
          content: <DeclineInviteContent declineCallback={declineCallback} />,
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>Accept</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={showDeclineInviteConfirmation}
            >
              <div className="flex items-center gap-2">
                <X className="h-4 w-4" />
                <span>Decline</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={showDeleteSprintConfirmation}
            >
              <div className="flex items-center gap-2 text-red-500">
                <Trash className="h-4 w-4" />
                <span>Delete</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
