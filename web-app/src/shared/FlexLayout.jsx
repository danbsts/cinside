import React from 'react';

import { css, cx } from '@emotion/css';

export default function FlexLayout({
  alignItems = 'stretch',
  children,
  expand = false,
  flexDirection = 'row',
  id,
  justifyContent = 'flex-start',
  style,
  width,
}) {
  const styleBase = css`
    width: ${width ?? '100%'};
    padding: 0;
    display: flex;
    flex-grow: ${expand ? 1 : 0};
    align-items: ${alignItems};
    flex-direction: ${flexDirection};
    justify-content: ${justifyContent};
  `;

  return (
    <div className={cx(styleBase, style)} id={id}>{children}</div>
  );
}
