import React, { Suspense } from 'react';

import { css } from '@emotion/css';

import { Redirect, Route } from 'react-router-dom';

import { Path } from 'router/routing';

import DktLoader from 'shared/DktLoader';
import DktRouter from 'router/DktRouter';
import FlexLayout from 'shared/FlexLayout';
import Header from 'header/Header';
import LogoutSucceeded from 'auth/LogoutSucceeded';
import ProfileEditPage from 'profile/ProfileEditPage';
import ProfilePage from 'profile/ProfilePage';
import ProjectCreationPage from 'projects/project/ProjectCreationPage';
import ProjectEditPage from 'projects/project/ProjectEditPage';
import ProjectListPage from 'projects/ProjectListPage';
import ProjectPage from 'projects/project/ProjectPage';

const pageStyle = css`
  height: 100%;
  width: 100%;
  margin-top: 100px;
  max-width: 1000px;
`;

function AppLayout() {
  return (
    <FlexLayout alignItems="center" flexDirection="column">
      <Header />
      <div className={pageStyle}>
        <Suspense fallback={<DktLoader />}>
          <DktRouter>
            <Route component={LogoutSucceeded} path={Path.LOGOUT_SUCCEEDED} />
            <Route component={ProjectEditPage} path={Path.PROJECTS_PROJECT_EDIT} />
            <Route component={ProjectCreationPage} path={Path.PROJECTS_NEW} />
            <Route component={ProjectPage} path={Path.PROJECTS_PROJECT} />
            <Route component={ProfileEditPage} path={Path.PROFILE_EDIT} />
            <Route component={ProfilePage} path={Path.PROFILE} />
            <Route component={ProjectListPage} path={Path.PROJECTS} />
            <Route exact component={ProjectListPage} path={Path.ROOT} />
          </DktRouter>
        </Suspense>
      </div>
    </FlexLayout>
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
