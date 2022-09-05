import React from 'react';

import { css } from '@emotion/css';

import { Path } from 'router/routing';

const containerStyle = css`
  background-color: black;
  padding: 40px 80px 20px;
  margin-top: auto;
`;

export default function Footer() {
  return (
    <div className={containerStyle}>
      <p>
        Nossa politica de privacidade:
        {' '}
        <a href={Path.PRIVACY_POLICY}>https://cinside.cin.ufpe.br/privacy</a>
        .
      </p>
    </div>
  );
}
