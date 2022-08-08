import React from 'react';

import { Redirect, Route } from 'react-router-dom';

import { Path } from 'router/routing';

import DktRouter from 'router/DktRouter';
import SignIn from 'auth/SignIn';
import SignInSucceeded from 'auth/SignInSucceeded';
import SignUp from 'auth/SignUp';
import UnauthenticatedWithHeaders from 'app/UnauthenticatedWithHeaders';

export default function UnauthenticatedApp() {
  return (
    <DktRouter>
      <Route exact component={UnauthenticatedWithHeaders} path={[Path.PROJECTS, Path.ROOT]} />
      <Route exact component={SignInSucceeded} path={Path.SIGN_IN_SUCCEEDED} />
      <Route exact component={SignIn} path={Path.SIGN_IN} />
      <Route exact component={SignUp} path={Path.SIGN_UP} />
      <Redirect to={Path.SIGN_IN} />
    </DktRouter>
  );
}
