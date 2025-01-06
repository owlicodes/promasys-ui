import { TOrganization } from "../organizations/organization-schemas";
import { TUser } from "../users/user-schemas";

export type TInvite = {
  id: string;
  email: string;
  organization: TOrganization;
  createdBy: TUser;
};
