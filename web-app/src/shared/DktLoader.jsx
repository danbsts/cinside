import React from 'react';

import Loader from 'react-loader-spinner';

import FlexLayout from 'shared/FlexLayout';

export default function DktLoader() {
  return (
    <FlexLayout alignItems="center" justifyContent="center">
      <Loader
        color="#172B4D"
        height={300}
        timeout={3000}
        type="Rings"
        width={300}
      />
    </FlexLayout>
  );
}
