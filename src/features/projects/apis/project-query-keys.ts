import { TWorkItemKeyMap } from "@/features/work-items/work-item-schemas";

export const projectQueryKeys = {
  root: ["projects"],
  byProjectId: (projectId: string) => [...projectQueryKeys.root, projectId],
  byUserId: (userId: string | undefined) => [...projectQueryKeys.root, userId],
  byUserAndOrg: (
    userId: string | undefined,
    organizationId: string | undefined
  ) => [...projectQueryKeys.root, userId, organizationId],
  sprintsByProjectId: (projectId: string) => [
    ...projectQueryKeys.root,
    projectId,
    "sprints",
  ],
  projectSprintById: (
    projectId: string | undefined,
    sprintId: string | null | undefined,
    filterType: TWorkItemKeyMap | "ALL"
  ) => [...projectQueryKeys.root, projectId, "sprints", sprintId, filterType],
  projectUsers: (projectId: string | undefined) => [
    ...projectQueryKeys.root,
    projectId,
    "users",
  ],
  projectStories: (projectId: string | undefined) => [
    ...projectQueryKeys.root,
    projectId,
    "stories",
  ],
  workItemsByProjectId: (
    projectId: string | undefined,
    filterType: TWorkItemKeyMap | "ALL"
  ) => [...projectQueryKeys.root, projectId, "work-items", filterType],
  backlogsByProjectId: (projectId: string | undefined) => [
    ...projectQueryKeys.root,
    projectId,
    "work-items",
    "backlogs",
  ],
  workItemDetailsByProjectIdAndWorkItemId: ({
    projectId,
    workItemId,
    filterType,
  }: {
    projectId: string | undefined;
    workItemId: string | undefined;
    filterType: TWorkItemKeyMap | "ALL";
  }) => [
    ...projectQueryKeys.root,
    projectId,
    "work-items",
    workItemId,
    filterType,
  ],
};
