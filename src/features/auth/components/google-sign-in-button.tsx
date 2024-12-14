"use client";

import Image from "next/image";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { ButtonVariants } from "@/features/common/types";

type GoogleSignInButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariants;
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
      <span className="flex items-center gap-2">
        <Image
          src="/google-icon.svg"
          alt="google icon"
          width={100}
          height={100}
          className="h-5 w-5"
        />
        {children}
      </span>
    </Button>
  );
};
