import { z } from "zod";

import { Owner } from "../common/schemas";
import { TOrganization } from "../organizations/organization-schemas";

export type TProject = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  organizationId: string;
  ownerId: string;
  owner: Owner;
  organization: TOrganization;
};

export type TCreateProject = Omit<TProject, "id" | "createdAt" | "owner">;
export type TUpdateProject = TCreateProject;

export const projectFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name is too long" })
    .regex(/^[a-zA-Z0-9\s-]+$/, {
      message: "Name can only contain letters, numbers, spaces, and hyphens.",
    }),
  description: z.string().min(1, {
    message: "Description field is required.",
  }),
});
export type TProjectSchema = z.infer<typeof projectFormSchema>;
