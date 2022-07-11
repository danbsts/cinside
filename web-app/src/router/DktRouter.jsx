import React from 'react';

import { Route, Switch } from 'react-router-dom';

import NotFoundErrorPage from 'shared/error/NotFoundErrorPage';

export default function DktRouter({ children }) {
  return (
    <Switch>
      {children}

      { /* TODO: 404 page */ }
      <Route component={NotFoundErrorPage} />
    </Switch>
  );
}
