import React from 'react';

import { css } from '@emotion/css';

import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';

const containerStyle = css`
  padding: 40px 28px;
  box-sizing: border-box;
`;
const projectStyle = css`
  font-family: 'Source Sans Pro';
  font-weight: 200;
`;
const contentStyle = css`
  height: 100%;
`;

export default function GeneralPage({ children }) {
  return (
    <FlexLayout expand flexDirection="column" style={containerStyle}>
      <FlexLayout>
        <DktText holder="h1">CInside</DktText>
        <DktText holder="h1" style={projectStyle}>Projects</DktText>
      </FlexLayout>
      <FlexLayout
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        style={contentStyle}
      >
        {children}
      </FlexLayout>
    </FlexLayout>
  );
}
