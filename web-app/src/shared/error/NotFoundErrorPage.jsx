import React from 'react';

import DktText from 'shared/DktText';
import ErrorPage from 'shared/error/ErrorPage';
import FlexLayout from 'shared/FlexLayout';

export default function NotFoundErrorPage() {
  return (
    <ErrorPage>
      <FlexLayout alignItems="center" flexDirection="column" justifyContent="center">
        <DktText holder="h1">404</DktText>
        <DktText>Page not found</DktText>
      </FlexLayout>
    </ErrorPage>
  );
}
