import { GoogleSignInButton } from "@/features/auth/components/google-sign-in-button";

export const InviteSection = () => {
  return (
    <section className="w-full bg-brand py-12 text-white md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Boost Your Productivity?
            </h2>
            <p className="mx-auto max-w-[600px] md:text-xl">
              Join thousands of teams already using promasys to streamline their
              project management. Just kidding, I don&apos;t have thousands of
              users, but maybe join me in using promasys.
            </p>
          </div>
          <GoogleSignInButton variant="outline" className="text-brand">
            Sign In with Google
          </GoogleSignInButton>
        </div>
      </div>
    </section>
  );
};
