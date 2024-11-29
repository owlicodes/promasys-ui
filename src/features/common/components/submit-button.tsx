import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
  isPending: boolean;
};

export const SubmitButton = ({
  children,
  className,
  isPending,
}: SubmitButtonProps) => {
  return (
    <Button type="submit" className={className} disabled={isPending}>
      {isPending ? (
        <div className="flex items-center">
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          <span>Submit</span>
        </div>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};
