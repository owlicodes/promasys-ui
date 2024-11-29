import { Loader } from "lucide-react";

export const Spinner = () => {
  return (
    <div className="flex w-full justify-center">
      <Loader className="h-4 w-4 animate-spin" />
    </div>
  );
};
