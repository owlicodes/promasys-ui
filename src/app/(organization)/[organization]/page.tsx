import { CurrentOrganizationCard } from "@/features/organizations/components/current-organization-card";
import { OrganizationProjectsList } from "@/features/organizations/components/organization-projects-list";
import { OrganizationWelcomeCard } from "@/features/organizations/components/organization-welcome-card";

export default function OrganizationHomePage() {
  return (
    <div className="my-4 space-y-6">
      <OrganizationWelcomeCard />
      <CurrentOrganizationCard />
      <OrganizationProjectsList />
    </div>
  );
}
