import { CurrentOrganizationCard } from "@/features/organizations/components/current-organization-card";
import { OrganizationWelcomeCard } from "@/features/organizations/components/organization-welcome-card";

export default function OrganizationHomePage() {
  return (
    <div className="mt-8 flex w-full flex-col gap-4 px-4 md:flex-row">
      <OrganizationWelcomeCard />
      <CurrentOrganizationCard />
    </div>
  );
}
