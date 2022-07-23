import { Domain } from 'shared/dikastis-constants';

const routes = {};

// TODO: add some validation
function registerRoute(domain, path, tabs = []) {
  routes[path] = {
    domain,
    tabs: Object.freeze(tabs),
  };
}

function registerGroup(domain, paths, tabs = []) {
  paths.forEach((path) => {
    registerRoute(domain, path, tabs);
  });
}

// TODO: add some validation
// genPath should be a function that generates the path
// and receives the split path as its first argument.
// e.g. [ 'teachers', '1234', '5678' ] for the URL:
// dikastis.com.br/teachers/1234/5678
function makeTab(name, genPath) {
  return {
    genPath,
    name,
  };
}

export const getRoute__UNSAFE = (path) => routes[path];

export const getRoutes = () => Object.freeze(routes);

// ADD ROUTES BELOW THIS LINE
// TODO - change parameters name to match pathname
export const Path = Object.freeze({
  ORGANIZATION: '/organizations/:organizationId',
  ORGANIZATIONS_HOME: '/organizations',
  ORGANIZATION_TEAM: '/organizations/:organizationId/:teamId',
  ORGANIZATION_TEAM_TASK: '/organizations/:organizationId/:teamId/:taskId',
  ORGANIZATION_TEAM_TASK_PERSON: '/organizations/:organizationId/:teamId/:taskId/:personId',
  PASSWORD_RECOVERY: '/password-recovery',
  PASSWORD_RECOVERY_REQUEST: '/recovery-request',
  PROBLEMS: '/problems',
  PROBLEMS_MINE: '/problems/mine',
  PROBLEMS_NEW: '/problems/new',
  PROBLEMS_PROBLEM: '/problems/:problemId',
  PROBLEMS_PROBLEM_EDIT: '/problems/:problemId/edit',
  PROBLEMS_PROBLEM_SUBMISSIONS: '/problems/:problemId/submissions',
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
  PROJECTS: '/projects',
  PROJECTS_NEW: '/projects/new',
  PROJECTS_PROJECT: '/projects/:id',
  PROJECTS_PROJECT_EDIT: '/projects/:id/edit',
  ROOT: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  TEAMS_HOME: '/teams',
  TEAMS_NEW: '/teams/new',
  TEAMS_TEAM: '/teams/:teamId',
  TEAMS_TEAM_EDIT: '/teams/:teamId/edit',
  TEAMS_TEAM_NEW_TASK: '/teams/:teamId/new-task',
  TEAMS_TEAM_TASK: '/teams/:teamId/:taskId',
  TEAMS_TEAM_TASK_EDIT: '/teams/:teamId/:taskId/edit',
});

export const DomainEntryPoint = Object.freeze({
  [Domain.PROJECTS]: Path.PROJECTS,
  [Domain.HOME]: Path.CATEGORIES,
  [Domain.PROFILE]: Path.PROFILE,
  [Domain.PROBLEMS]: Path.PROBLEMS,
  [Domain.TEAMS]: Path.TEAMS_HOME,
  [Domain.ORGANIZATIONS]: Path.ORGANIZATIONS_HOME,
});

registerGroup(
  Domain.PROJECTS,
  [
    Path.ROOT,
    Path.PROJECTS,
    Path.PROJECTS_NEW,
    Path.PROJECTS_PROJECT,
    Path.PROJECTS_PROJECT_EDIT,
  ],
);

registerRoute(Domain.HOME, Path.CATEGORIES);

registerGroup(
  Domain.PROFILE,
  [
    Path.PROFILE,
    Path.PROFILE_EDIT,
  ],
);

registerGroup(
  Domain.PROBLEMS,
  [
    Path.PROBLEMS,
    Path.PROBLEMS_MINE,
  ],
  [
    makeTab('All Problems', () => Path.PROBLEMS),
    makeTab('My Problems', () => Path.PROBLEMS_MINE),
  ],
);

registerGroup(
  Domain.PROBLEMS,
  [
    Path.PROBLEMS_PROBLEM,
    Path.PROBLEMS_PROBLEM_SUBMISSIONS,
  ],
  [
    makeTab('Problem', ({ problemId }) => Path.PROBLEMS_PROBLEM.replace(':problemId', problemId)),
    makeTab('Submissions', ({ problemId }) => Path.PROBLEMS_PROBLEM_SUBMISSIONS.replace(':problemId', problemId)),
  ],
);

registerGroup(
  Domain.PROBLEMS,
  [
    Path.PROBLEMS_NEW,
    Path.PROBLEMS_PROBLEM_EDIT,
  ],
);

registerGroup(
  Domain.ORGANIZATIONS,
  [
    Path.ORGANIZATIONS_HOME,
    Path.ORGANIZATION,
    Path.ORGANIZATION_TEAM_TASK,
    Path.ORGANIZATION_TEAM,
    Path.ORGANIZATION_TEAM_TASK_PERSON,
  ],
);

registerGroup(
  Domain.TEAMS,
  [
    Path.TEAMS_HOME,
    Path.TEAMS_TEAM_TASK,
    Path.TEAMS_TEAM,
    Path.TEAMS_NEW,
    Path.TEAMS_TEAM_EDIT,
    Path.TEAMS_TEAM_NEW_TASK,
    Path.TEAMS_TEAM_TASK_EDIT,
  ],
);
