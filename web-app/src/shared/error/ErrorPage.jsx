import React from 'react';

import DktButton from 'shared/DktButton';
import DktCard from 'shared/DktCard';
import GeneralPage from 'shared/GeneralPage';

export default function ErrorPage({ children }) {
  const buttons = (
    <DktButton href="/">
      Home
    </DktButton>
  );

  return (
    <GeneralPage buttons={buttons}>
      <DktCard>
        {children}
      </DktCard>
    </GeneralPage>
  );
}
