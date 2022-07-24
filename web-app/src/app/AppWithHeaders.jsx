import React, { Suspense } from 'react';

import { css } from '@emotion/css';

import DktLoader from 'shared/DktLoader';
import FlexLayout from 'shared/FlexLayout';
import Header from 'header/Header';

const pageStyle = css`
  height: 100%;
  width: 100%;
  margin-top: 100px;
  max-width: 1000px;
`;

export default function AppWithHeaders({ children }) {
  return (
    <FlexLayout alignItems="center" flexDirection="column">
      <Header />
      <div className={pageStyle}>
        <Suspense fallback={<DktLoader />}>
          {children}
        </Suspense>
      </div>
    </FlexLayout>
  );
}
