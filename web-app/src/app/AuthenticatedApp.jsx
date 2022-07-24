import React from 'react';

import { Redirect, Route } from 'react-router-dom';

import { Path } from 'router/routing';

import AppWithHeaders from 'app/AppWithHeaders';
import DktRouter from 'router/DktRouter';
import ProfileEditPage from 'profile/ProfileEditPage';
import ProfilePage from 'profile/ProfilePage';
import ProjectCreationPage from 'projects/project/ProjectCreationPage';
import ProjectEditPage from 'projects/project/ProjectEditPage';
import ProjectListPage from 'projects/ProjectListPage';
import ProjectPage from 'projects/project/ProjectPage';

function AppLayout() {
  return (
    <AppWithHeaders>
      <DktRouter>
        <Route component={ProjectEditPage} path={Path.PROJECTS_PROJECT_EDIT} />
        <Route component={ProjectCreationPage} path={Path.PROJECTS_NEW} />
        <Route component={ProjectPage} path={Path.PROJECTS_PROJECT} />
        <Route component={ProfileEditPage} path={Path.PROFILE_EDIT} />
        <Route component={ProfilePage} path={Path.PROFILE} />
        <Route component={ProjectListPage} path={Path.PROJECTS} />
        <Route exact component={ProjectListPage} path={Path.ROOT} />
      </DktRouter>
    </AppWithHeaders>
  );
}

export default function AuthenticatedApp() {
  return (
    <DktRouter>
      <Route exact path={[Path.SIGN_IN, Path.SIGN_UP]}>
        <Redirect to={Path.ROOT} />
      </Route>
      <Route component={AppLayout} path={Path.ROOT} />
    </DktRouter>
  );
}
