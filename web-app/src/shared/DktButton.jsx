import React from 'react';

import { css, cx } from '@emotion/css';
import { Link } from 'react-router-dom';

const styleBase = css`
  box-shadow: 0px 4px 14px 2px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  cursor: pointer;
  font: 20px Raleway, sans-serif;
  font-weight: 500;
  outline: none;
  padding: 10px 24px;
`;
const defaultStyle = css`
  background-color: #235BFF;
  border: none;
  color: #FFF;
  :hover {
    background-color: #3964e6;
  }
`;
const invisibleStyle = css`
  box-shadow: none;
  background: none;
  border: none;
  color: none;
  :hover {
    background-color: none;
  }
`;
const negativeStyle = css`
  background-color: #FFF;
  border: 1px solid #172B4D;
  color: #1C1C1C;
  :hover {
    background-color: #EEE;
  }
`;

// TODO invisible prop creates impossible state, so this needs to be refactored
export default function DktButton({
  children,
  href,
  invisible,
  negative,
  onClick,
  style,
  submit,
}) {
  const computedStyle = cx(
    styleBase,
    { [negativeStyle]: negative && !invisible },
    { [defaultStyle]: !negative && !invisible },
    { [invisibleStyle]: invisible },
    style,
  );

  if (href) {
    return (
      <Link className={computedStyle} to={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={computedStyle} type={submit ? 'submit' : 'button'} onClick={onClick}>
      {children}
    </button>
  );
}
