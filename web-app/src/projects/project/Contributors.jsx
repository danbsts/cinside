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

function ContributorBox({ displayName, role }) {
  return (
    <div className={contributorStyle}>
      <DktText holder="h4">{displayName}</DktText>
      <DktText holder="p" style={roleStyle}>{role}</DktText>
    </div>
  );
}

export default function Contributors() {
  return (
    <FlexLayout justifyContent="space-between" style={contributorsContainerStyle}>
      {[
        { displayName: 'Daniel Bastos', role: 'Full-stack engineer' },
        { displayName: 'Paulo Veloso', role: 'Backend Engineer' },
        { displayName: 'Paulo Veloso', role: 'Backend Engineer' },
        { displayName: 'Paulo Veloso', role: 'Backend Engineer' },
      ].map(({ displayName, role }) => <ContributorBox displayName={displayName} role={role} />)}
    </FlexLayout>
  );
}
