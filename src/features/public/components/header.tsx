import { getServerSession } from "next-auth";

import { GoogleSignInButton } from "@/features/auth/components/google-sign-in-button";
import { authOptions } from "@/lib/next-auth-config";

export const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex h-[60px] w-full items-center justify-between bg-white px-4 shadow-md">
      <h1 className="text-xl font-bold text-brand">promasys</h1>

      {!session?.user && <GoogleSignInButton />}
    </header>
  );
};
