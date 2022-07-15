import React from 'react';

import { css } from '@emotion/css';

import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';

const contributorStyle = css`
  margin-bottom: 24px;
`;
const roleStyle = css`
  font-size: 16px;
  color: #235bff;
`;
const contributorsContainerStyle = css`
  flex-wrap: wrap;
  margin: 12px 0;
`;

function ContributorBox({ name, role }) {
  return (
    <div className={contributorStyle}>
      <DktText holder="h4">{name}</DktText>
      <DktText holder="p" style={roleStyle}>{role}</DktText>
    </div>
  );
}

export default function Contributors({ contributors }) {
  return (
    <FlexLayout justifyContent="space-between" style={contributorsContainerStyle}>
      {contributors.map(({ name, role }, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <ContributorBox key={idx} name={name} role={role} />
      ))}
    </FlexLayout>
  );
}
