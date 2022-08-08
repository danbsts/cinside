import React from 'react';

import { Route } from 'react-router-dom';

import { Path } from 'router/routing';

import AppWithHeaders from 'app/AppWithHeaders';
import DktRouter from 'router/DktRouter';
import Home from 'app/Home';
import ProjectListPage from 'projects/ProjectListPage';

export default function UnauthenticatedWithHeaders() {
  return (
    <AppWithHeaders>
      <DktRouter>
        <Route exact component={ProjectListPage} path={Path.PROJECTS} />
        <Route exact component={Home} path={Path.ROOT} />
      </DktRouter>
    </AppWithHeaders>
  );
}
