import { z } from "zod";

export type Owner = {
  id: string;
  name: string;
  email: string;
};

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

export const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Organization name is required" })
    .max(50, { message: "Organization name is too long" })
    .regex(/^[a-zA-Z0-9\s-]+$/, {
      message: "Name can only contain letters, numbers, spaces, and hyphens.",
    }),
  description: z.string().min(1, {
    message: "Description field is required.",
  }),
});
export type TFormSchema = z.infer<typeof formSchema>;
