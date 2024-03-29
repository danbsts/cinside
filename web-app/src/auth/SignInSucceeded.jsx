import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { Path } from 'router/routing';
import { useAuth } from 'auth/auth-context';

import DktText from 'shared/DktText';
import GeneralPage from 'shared/GeneralPage';

export default function SignInSucceeded() {
  const history = useHistory();
  const { loginSucceeded } = useAuth();

  useEffect(() => {
    document.title = 'Welcome!';
    loginSucceeded();
    history.replace(Path.PROJECTS);
  }, []);

  return (
    <GeneralPage>
      <DktText holder="h1">Welcome!</DktText>
      <DktText holder="h3">You&apos;re going to be redirected soon.</DktText>
    </GeneralPage>
  );
}
