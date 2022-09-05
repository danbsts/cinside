import React, { useEffect } from 'react';

import { useAuth } from 'auth/auth-context';

import DktButton from 'shared/DktButton';
import GeneralPage from 'shared/GeneralPage';

export default function SignIn() {
  const { login } = useAuth();

  useEffect(() => { document.title = 'Sign In'; }, []);

  return (
    <GeneralPage>
      <DktButton onClick={login}>
        Sign In with Google
      </DktButton>
    </GeneralPage>
  );
}
