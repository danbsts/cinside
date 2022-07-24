import React from 'react';

import { css } from '@emotion/css';

import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';

const containerStyle = css`
  margin-top: 12px;
  overflow-x: scroll;
`;
const imgStyle = css`
  max-width: 400px;
  margin-right: 20px;
`;

export default function ImageBox({ images }) {
  if (!images || images.length === 0) {
    return <div />;
  }
  return (
    <>
      <DktText holder="h3">Images</DktText>
      <FlexLayout alignItems="center" style={containerStyle}>
        {images.map((imgUrl, idx) => (
          <img alt={`Screenshot ${idx}`} className={imgStyle} src={imgUrl} />
        ))}
      </FlexLayout>
    </>
  );
}
