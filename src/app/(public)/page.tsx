import Link from "next/link";

import { getServerSession } from "next-auth";

import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/next-auth-config";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1 className="mb-4 text-3xl font-semibold">Welcome to promasys!</h1>
      {session?.user && (
        <Link href="/default">
          <Button className="w-full">Get Started</Button>
        </Link>
      )}
    </div>
  );
}
