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
  name: z.string().trim().min(1, {
    message: "Name field is required.",
  }),
  description: z.string().min(1, {
    message: "Description field is required.",
  }),
});
export type TFormSchema = z.infer<typeof formSchema>;
