import Link from "next/link";

import { getServerSession } from "next-auth";

import { Button } from "@/components/ui/button";
import { GoogleSignInButton } from "@/features/auth/components/google-sign-in-button";
import { authOptions } from "@/lib/next-auth-config";

export const HeroSection = async () => {
  const session = await getServerSession(authOptions);

  return (
    <section className="w-full bg-gradient-to-r from-brand via-purple-500 to-pink-200 py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl/none">
              Manage Your Projects with Ease
            </h1>
            <p className="mx-auto max-w-[700px] tracking-tight md:text-xl">
              Hi 👋, I am{" "}
              <span className="font-bold text-yellow-400">Jose Diago</span>, and
              I built this app to help you streamline your workflow, collaborate
              effortlessly, and deliver projects on time with promasys.
            </p>
          </div>
          <div className="space-x-4">
            {!session?.user ? (
              <GoogleSignInButton>Start Exploring!</GoogleSignInButton>
            ) : (
              <Link href="/default">
                <Button size="lg">Get Started</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
