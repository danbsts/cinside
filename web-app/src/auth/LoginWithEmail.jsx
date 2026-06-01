import React, { useEffect, useState } from 'react';

import { css } from '@emotion/css';

import { useAuth } from 'auth/auth-context';

import DktButton from 'shared/DktButton';
import GeneralPage from 'shared/GeneralPage';

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 360px;
`;
const inputStyle = css`
  border: 1px solid #DDD;
  border-radius: 8px;
  font: 16px Raleway, sans-serif;
  padding: 12px 16px;
  outline: none;
  :focus {
    border-color: #235BFF;
  }
`;
const errorStyle = css`
  color: #D32F2F;
  font: 14px Raleway, sans-serif;
  text-align: center;
`;
const dividerStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #999;
  font: 14px Raleway, sans-serif;
  margin: 8px 0;
`;
const lineStyle = css`
  flex: 1;
  height: 1px;
  background: #DDD;
`;

export default function LoginWithEmail() {
  const { login, loginWithCredentials } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { document.title = 'Sign In'; }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await loginWithCredentials(email, password);
    } catch (err) {
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <GeneralPage>
      <form className={formStyle} onSubmit={handleSubmit}>
        <input
          className={inputStyle}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={inputStyle}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <span className={errorStyle}>{error}</span>}
        <DktButton submit disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </DktButton>
        <div className={dividerStyle}>
          <span className={lineStyle} />
          or
          <span className={lineStyle} />
        </div>
        <DktButton negative onClick={login}>
          Sign In with Google
        </DktButton>
      </form>
    </GeneralPage>
  );
}
