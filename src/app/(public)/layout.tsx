import { PropsWithChildren } from "react";

import { BetaBanner } from "@/features/public/components/beta-banner";
import { Header } from "@/features/public/components/header";

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <BetaBanner />
      <Header />

      <div className="flex min-h-[calc(100vh-60px)] items-center justify-center">
        {children}
      </div>
    </div>
  );
}
