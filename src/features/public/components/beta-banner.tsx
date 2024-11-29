"use client";

import { useState } from "react";

import { X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const BetaBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Alert className="relative rounded-none bg-primary text-primary-foreground">
      <AlertTitle>Beta Version</AlertTitle>
      <AlertDescription>
        This web application is undergoing progressive changes and is still in
        beta. We appreciate your understanding! For concerns, raise an issue in
        the{" "}
        <a
          href="https://github.com/owlicodes/promasys-ui"
          target="_blank"
          className="font-bold underline"
        >
          github
        </a>{" "}
        repository.
      </AlertDescription>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-2 rounded-full p-1 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </Alert>
  );
};
