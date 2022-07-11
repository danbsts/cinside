import React from 'react';

import { Redirect, Route } from 'react-router-dom';

import { Path } from 'router/routing';

import DktRouter from 'router/DktRouter';
import SignIn from 'auth/SignIn';
import SignUp from 'auth/SignUp';

export default function UnauthenticatedApp() {
  return (
    <DktRouter>
      <Route exact component={SignIn} path={Path.SIGN_IN} />
      <Route exact component={SignUp} path={Path.SIGN_UP} />
      <Redirect to={Path.SIGN_IN} />
    </DktRouter>
  );
}
