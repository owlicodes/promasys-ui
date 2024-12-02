export const projectQueryKeys = {
  root: ["projects"],
  byUserId: (userId: string | undefined) => [...projectQueryKeys.root, userId],
  byUserAndOrg: (
    userId: string | undefined,
    organizationId: string | undefined
  ) => [...projectQueryKeys.root, userId, organizationId],
};
