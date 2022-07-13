import React from 'react';

import DktText from 'shared/DktText';
import ErrorPage from 'shared/error/ErrorPage';

export default function StackErrorPage({ error }) {
  return (
    <ErrorPage>
      <DktText>{error.message}</DktText>
      <DktText>{error.stack}</DktText>
    </ErrorPage>
  );
}
