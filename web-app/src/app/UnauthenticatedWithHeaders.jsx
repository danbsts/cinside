import React, { Suspense } from 'react';

import { Route } from 'react-router-dom';
import { css } from '@emotion/css';

import { Path } from 'router/routing';

import DktLoader from 'shared/DktLoader';
import DktRouter from 'router/DktRouter';
import FlexLayout from 'shared/FlexLayout';
import Header from 'header/Header';
import ProjectListPage from 'projects/ProjectListPage';

const pageStyle = css`
  height: 100%;
  width: 100%;
  margin-top: 100px;
  max-width: 1000px;
`;

export default function UnauthenticatedWithHeaders() {
  return (
    <FlexLayout alignItems="center" flexDirection="column">
      <Header />
      <div className={pageStyle}>
        <Suspense fallback={<DktLoader />}>
          <DktRouter>
            <Route exact component={ProjectListPage} path={Path.PROJECTS} />
          </DktRouter>
        </Suspense>
      </div>
    </FlexLayout>
  );
}
