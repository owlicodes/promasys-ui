import { UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import useDialogConfigStore from "@/stores/dialog-store";

import { InviteUserForm } from "./invite-user-form";

export const InviteUserButton = () => {
  const { setDialogConfig } = useDialogConfigStore();

  const showInviteUserForm = () =>
    setDialogConfig({
      open: true,
      title: "Invite User",
      description: "Add a new user to your organization.",
      content: <InviteUserForm />,
    });

  return (
    <Button onClick={showInviteUserForm} className="w-full md:w-fit">
      <UserIcon />
      Invite User
    </Button>
  );
};
