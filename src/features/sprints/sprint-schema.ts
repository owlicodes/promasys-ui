import { z } from "zod";

export type TSprint = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "PLANNED" | "STARTED" | "CLOSED";
  projectId: string;
};

export type TCreateSprint = Omit<TSprint, "id">;
export type TUpdateSprint = TSprint;

export const sprintFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name is too long." })
    .regex(/^[a-zA-Z0-9\s-]+$/, {
      message: "Name can only contain letters, numbers, spaces, and hyphens.",
    }),
  dateRange: z
    .object(
      {
        from: z.date().optional(),
        to: z.date().optional(),
      },
      { required_error: "Sprint date range is required." }
    )
    .refine((date) => {
      return !!date.from;
    }, "Sprint date range is required."),
  status: z.enum(["PLANNED", "STARTED", "CLOSED"]),
});
export type TSprintFormSchema = z.infer<typeof sprintFormSchema>;
