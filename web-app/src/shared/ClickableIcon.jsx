import React from 'react';

import { css } from '@emotion/css';

const buttonStyle = css`
  height: fit-content;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
`;

export default function ClickableIcon({
  alt, onClick, src,
}) {
  return (
    <button className={buttonStyle} type="button" onClick={onClick}>
      <img alt={alt} src={src} />
    </button>
  );
}
