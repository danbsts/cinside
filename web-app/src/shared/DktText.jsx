import React from 'react';

import { css, cx } from '@emotion/css';

const h1 = css`
  margin: 0;
  color: #EEE;
  font: 40px Viga, Sans-serif;
`;
const h2 = css`
  margin: 0;
  font-weight: 600;
  font-size: 35px;
  color: #eee;
`;
const h3 = css`
  margin: 0;
  color: #eee;
  font-weight: 600;
  font-size: 24px;
`;
const h4 = css`
  margin: 0;
  color: #eee;
  font-weight: 400;
  font-size: 20px;
`;
const monospace = css`
  margin: 0;
  color: #eee;
  font-family: monospace;
  white-space: pre-line;
  font-weight: 400;
  font-size: 18px;
`;
const p = css`
  margin: 0;
  color: #eee;
  font-weight: 400;
  font-size: 18px;
`;
const formTitle = css`
  margin: 20px 0 8px;
  font-weight: 600;
  color: #235BFF;
  :first-child {
    margin-right: 32px;
  }
`;
const underlined = css`
  margin: 0;
  text-decoration: underline;
  color: #172B4D;
  font-size: 18px;
  font-weight: 600;
  align-self: center;
`;

export default function DktText({
  children,
  holder,
  style,
}) {
  if (holder === 'h1') {
    return <h1 className={cx(h1, style)}>{children}</h1>;
  }
  if (holder === 'h2') {
    return <h2 className={cx(h2, style)}>{children}</h2>;
  }
  if (holder === 'h3') {
    return <h3 className={cx(h3, style)}>{children}</h3>;
  }
  if (holder === 'h4') {
    return <h4 className={cx(h4, style)}>{children}</h4>;
  }
  if (holder === 'form-title') {
    return <h4 className={cx(h4, formTitle, style)}>{children}</h4>;
  }
  if (holder === 'monospace') {
    return <p className={cx(monospace, style)}>{children}</p>;
  }
  if (holder === 'underlined') {
    return <p className={cx(underlined, style)}>{children}</p>;
  }
  return <p className={cx(p, style)}>{children}</p>;
}
