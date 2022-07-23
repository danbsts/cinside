export const ProjectVisibility = {
  ALL: 'All',
  PRIVATE: 'Private',
  PUBLIC: 'Public',
};

export const ProjectStatus = {
  ALL: 'All',
  NEW_IDEA: 'New/Idea',
  // eslint-disable-next-line sort-keys
  IN_DEVELOPMENT: 'In development',
  // eslint-disable-next-line sort-keys
  DEPLOYED_MAINTAINING: 'Deployed/Maintaining',
};

export function ProjectStatusToKey(status) {
  const keys = Object.entries(ProjectStatus)
    .filter(([, display]) => display === status)
    .map(([key]) => key);
  if (keys.length === 0) return status;
  return keys[0];
}

export function ProjectVisibilityToKey(visibility) {
  const keys = Object.entries(ProjectVisibility)
    .filter(([, display]) => display === visibility)
    .map(([key]) => key);
  if (keys.length === 0) return visibility;
  return keys[0];
}
