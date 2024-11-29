import Link from "next/link";

import { getServerSession } from "next-auth";

import { Button } from "@/components/ui/button";
import { GoogleSignInButton } from "@/features/auth/components/google-sign-in-button";
import { authOptions } from "@/lib/next-auth-config";

export const InviteSection = async () => {
  const session = await getServerSession(authOptions);

  return (
    <section className="w-full bg-brand py-12 text-white md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Boost Your Productivity?
            </h2>
            <p className="mx-auto max-w-[600px] md:text-xl">
              Join thousands of teams already using promasys to streamline their
              project management.{" "}
              <span className="italic">
                Just kidding, I don&apos;t have thousands of users, but maybe
                join me in using promasys
              </span>
              .
            </p>
          </div>
          {!session?.user ? (
            <GoogleSignInButton variant="outline" className="text-brand">
              Sign In with Google
            </GoogleSignInButton>
          ) : (
            <Link href="/default">
              <Button size="lg" variant="outline" className="text-brand">
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
