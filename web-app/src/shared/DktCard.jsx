import React from 'react';

import { css, cx } from '@emotion/css';
import { Link } from 'react-router-dom';

const styleBase = css`
  padding: 20px 32px;
  box-shadow: 0px 4px 14px 2px rgba(0, 0, 0, 0.08);
  border-radius: 15px;
  border: 1px solid #235BFF;
  background-color: #1C1C1C;
`;
const linkStyle = css`
  text-decoration: none;
`;

export default function DktCard({ children, linkTo, style }) {
  const card = <div className={cx(styleBase, style)} name="card">{children}</div>;

  if (linkTo) {
    return (
      <Link className={linkStyle} to={linkTo}>
        {card}
      </Link>
    );
  }

  return card;
}
