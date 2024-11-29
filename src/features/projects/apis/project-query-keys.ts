export const projectQueryKeys = {
  root: ["projects"],
  byUserId: (userId: string | undefined) => [...projectQueryKeys.root, userId],
};
