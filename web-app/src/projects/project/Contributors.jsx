import React from 'react';

import { css } from '@emotion/css';

import ClickableIcon from 'shared/ClickableIcon';
import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';

import removeIcon from 'assets/remove-cross.svg';

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

function ContributorBox({ name, remove, role }) {
  if (!remove) {
    return (
      <div className={contributorStyle}>
        <DktText holder="h4">{name}</DktText>
        <DktText holder="p" style={roleStyle}>{role}</DktText>
      </div>
    );
  }

  return (
    <FlexLayout width="fit-content">
      <div className={contributorStyle}>
        <DktText holder="h4">{name}</DktText>
        <DktText holder="p" style={roleStyle}>{role}</DktText>
      </div>
      <ClickableIcon alt="Remove" src={removeIcon} onClick={() => remove(name)} />
    </FlexLayout>
  );
}

export default function Contributors({ contributors, remove }) {
  return (
    <FlexLayout justifyContent="space-between" style={contributorsContainerStyle}>
      {contributors.map(({ name, role }, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <ContributorBox key={idx} name={name} remove={remove} role={role} />
      ))}
    </FlexLayout>
  );
}
