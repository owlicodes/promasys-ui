"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const SignOutButton = () => {
  const handleSignOut = () =>
    signOut({
      callbackUrl: "/",
      redirect: true,
    });

  return (
    <Button onClick={handleSignOut} className="w-full" variant="link">
      Sign Out
    </Button>
  );
};
