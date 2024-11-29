import { PropsWithChildren } from "react";

import { Header } from "@/features/public/components/header";

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />

      <div className="flex min-h-[calc(100vh-60px)] items-center justify-center">
        {children}
      </div>
    </div>
  );
}
