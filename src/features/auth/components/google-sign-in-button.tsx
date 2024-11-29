"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

type GoogleSignInButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
};

export const GoogleSignInButton = ({
  children,
  className,
  variant = "default",
}: GoogleSignInButtonProps) => {
  const handleGoogleSignIn = () => {
    signIn("google", {
      callbackUrl: "/default",
    });
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      size="lg"
      variant={variant}
      className={className}
    >
      {children}
    </Button>
  );
};
