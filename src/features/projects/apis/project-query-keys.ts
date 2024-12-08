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
  projectSprintById: (projectId: string, sprintId: string) => [
    ...projectQueryKeys.root,
    projectId,
    "sprints",
    sprintId,
  ],
  projectUsers: (projectId: string | undefined) => [
    ...projectQueryKeys.root,
    projectId,
    "users",
  ],
  workItemsByProjectId: (projectId: string | undefined) => [
    ...projectQueryKeys.root,
    projectId,
    "work-items",
  ],
  workItemDetailsByProjectIdAndWorkItemId: ({
    projectId,
    workItemId,
  }: {
    projectId: string | undefined;
    workItemId: string | undefined;
  }) => [...projectQueryKeys.root, projectId, "work-items", workItemId],
};
