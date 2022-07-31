import React, { useEffect } from 'react';

import { css } from '@emotion/css';

import { useAuth } from 'auth/auth-context';

import DktButton from 'shared/DktButton';
import GeneralPage from 'shared/GeneralPage';

const buttonStyle = css`
  margin-top: 20px;
`;

export default function SignIn() {
  const { login } = useAuth();

  useEffect(() => { document.title = 'Sign In'; }, []);

  return (
    <GeneralPage>
      <DktButton onClick={login}>
        Sign In with Google
      </DktButton>
      <DktButton negative href="/sign-up" style={buttonStyle}>
        Register now
      </DktButton>
    </GeneralPage>
  );
}
