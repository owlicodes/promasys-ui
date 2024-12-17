import { CreateOrganizationButton } from "@/features/organizations/components/create-organization-button";
import { CreateProjectButton } from "@/features/projects/components/create-project-button";

export const OrganizationWelcomeCard = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">
        Welcome to <span className="text-brand">proyektibo</span>!
      </h1>
      <p>Let&apos;s get started by choosing 1 of the following actions.</p>
      <div className="space-y-2 md:flex md:gap-4 md:space-y-0">
        <CreateOrganizationButton />
        <CreateProjectButton />
      </div>
    </div>
  );
};
