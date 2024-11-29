import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateOrganizationButton } from "@/features/organizations/components/create-organization-button";

export const OrganizationWelcomeCard = () => {
  return (
    <Card className="mx-auto w-full md:max-w-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          Welcome to <span className="text-brand">promasys</span>!
        </CardTitle>
        <CardDescription>
          Let&apos;s get started by choosing 1 of the following actions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4 md:flex md:gap-4 md:space-y-0">
          <CreateOrganizationButton />
          <Button className="w-full">Create New Project</Button>
        </div>
      </CardContent>
    </Card>
  );
};
