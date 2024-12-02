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

export type TCreateOrganization = Omit<
  TOrganization,
  "id" | "createdAt" | "owner"
>;
export type TUpdateOrganization = TCreateOrganization;

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
