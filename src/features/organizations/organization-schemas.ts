import { z } from "zod";

import { Owner } from "../common/schemas";

export type TOrganization = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  ownerId: string;
  owner: Owner;
};

export type TInvite = {
  id: string;
  email: string;
  organizationId: string;
};

export type TCreateOrganization = Omit<
  TOrganization,
  "id" | "createdAt" | "owner"
>;
export type TUpdateOrganization = TCreateOrganization;

export type TCreateInvite = Omit<TInvite, "id">;

export const organizationFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name is too long." })
    .regex(/^[a-zA-Z0-9\s-]+$/, {
      message: "Name can only contain letters, numbers, spaces, and hyphens.",
    }),
  description: z.string().min(1, {
    message: "Description field is required.",
  }),
});
export type TOrganizationFormSchema = z.infer<typeof organizationFormSchema>;

export const inviteUserFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email.",
  }),
});
export type TInviteUserFormSchema = z.infer<typeof inviteUserFormSchema>;
