export const inviteQueryKeys = {
  root: ["invites"],
  byUser: (email: string | undefined) => [...inviteQueryKeys.root, email],
};
