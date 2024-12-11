import { TOrganization } from "./organization-schemas";

export const getSelectedOrganization = (
  name: string,
  organizations: TOrganization[] = []
) => {
  if (organizations.length === 1) {
    return organizations[0];
  } else {
    const organization =
      name === "default"
        ? organizations?.find((org) =>
            org.name.toLowerCase().includes("default")
          )
        : organizations?.find(
            (org) =>
              org.name.toLowerCase() === decodeURIComponent(name.toLowerCase())
          );

    if (!organization) {
      return organizations[0];
    } else {
      return organization;
    }
  }
};
