import React from 'react';

import { css } from '@emotion/css';

const errorStyle = css`
  margin-top: 4px;
  color: #c20114;
`;

export default function DktErrorField({ children }) {
  return <div className={errorStyle}>{children}</div>;
}
