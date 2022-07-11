import React, { Suspense } from 'react';

import { css } from '@emotion/css';

import { Redirect, Route } from 'react-router-dom';

import { Path } from 'router/routing';

import DktLoader from 'shared/DktLoader';
import DktRouter from 'router/DktRouter';
import FlexLayout from 'shared/FlexLayout';
import Header from 'header/Header';
import ProjectListPage from 'projects/ProjectListPage';

const pageStyle = css`
  height: 100%;
  width: fit-content;
  margin-top: 100px;
  max-width: 1000px;
`;

function AppLayout() {
  return (
    <FlexLayout alignItems="center" flexDirection="column">
      <Header />
      <div className={pageStyle} flowDirection="column" justifyContent="center">
        <Suspense fallback={<DktLoader />}>
          <DktRouter>
            <Route component={ProjectListPage} path={Path.PROJECTS} />
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
      <Route component={AppLayout} path="/projects" />
      <Route exact component={ProjectListPage} path={Path.ROOT} />
    </DktRouter>
  );
}
