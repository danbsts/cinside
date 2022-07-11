import React from 'react';

import { css } from '@emotion/css';

import useDikastisRouting from 'router/useDikastisRouting';

import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';
import Navbar from 'navigation/NavBar';

const headerStyle = css`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 20px 0;
  background-color: #1C1C1C;
`;

export default function Header() {
  const { domain } = useDikastisRouting();

  return (
    <FlexLayout alignItems="center" style={headerStyle}>
      <Navbar />
      <FlexLayout alignItems="center" justifyContent="space-around">
        <DktText holder="h1">{domain}</DktText>
      </FlexLayout>
    </FlexLayout>
  );
}
