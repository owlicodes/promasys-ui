import { TOrganization } from "./organization-schemas";

export const getSelectedOrganization = (
  name: string,
  organizations: TOrganization[] = []
) => {
  return name === "default"
    ? organizations?.find((org) => org.name.toLowerCase().includes("default"))
    : organizations?.find(
        (org) =>
          org.name.toLowerCase() === decodeURIComponent(name.toLowerCase())
      );
};
