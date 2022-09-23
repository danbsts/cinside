import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { Path } from 'router/routing';
import { useAuth } from 'auth/auth-context';

import DktText from 'shared/DktText';
import GeneralPage from 'shared/GeneralPage';

export default function LogoutSucceeded() {
  const history = useHistory();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    history.replace(Path.SIGN_IN);
  }, []);

  return (
    <GeneralPage>
      <DktText holder="h1">See ya!</DktText>
      <DktText holder="h3">You&apos;re going to be redirected soon.</DktText>
    </GeneralPage>
  );
}
