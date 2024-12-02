export const projectQueryKeys = {
  root: ["projects"],
  byProjectId: (projectId: string) => [...projectQueryKeys.root, projectId],
  byUserId: (userId: string | undefined) => [...projectQueryKeys.root, userId],
  byUserAndOrg: (
    userId: string | undefined,
    organizationId: string | undefined
  ) => [...projectQueryKeys.root, userId, organizationId],
};
