import { GoogleSignInButton } from "@/features/auth/components/google-sign-in-button";

export const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-r from-brand via-purple-500 to-pink-200 py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Manage Your Projects with Ease
            </h1>
            <p className="mx-auto max-w-[700px] md:text-xl">
              Streamline your workflow, collaborate effortlessly, and deliver
              projects on time with promasys.
            </p>
          </div>
          <div className="space-x-4">
            <GoogleSignInButton>Sign In with Google</GoogleSignInButton>
          </div>
        </div>
      </div>
    </section>
  );
};
