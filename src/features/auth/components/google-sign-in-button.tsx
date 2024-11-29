"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    signIn("google", {
      callbackUrl: "/default",
    });
  };

  return <Button onClick={handleGoogleSignIn}>Sign In With Google</Button>;
};
