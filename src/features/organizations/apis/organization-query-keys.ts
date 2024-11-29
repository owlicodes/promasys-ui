export const organizationQueryKeys = {
  root: ["organizations"],
  byUserId: (userId: string | undefined) => [
    ...organizationQueryKeys.root,
    userId,
  ],
};
