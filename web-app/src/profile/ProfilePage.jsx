import React from 'react';

import { css } from '@emotion/css';
import { useQuery } from 'react-query';

import { Path } from 'router/routing';

import DktButton from 'shared/DktButton';
import DktText from 'shared/DktText';

const containerStyle = css`
  width: fit-content;
  max-width: 1000px;
  margin: auto;
`;
const titleStyle = css`
  margin: 18px 0 4px;
  color: #235BFF;
`;
const editStyle = css`
  margin-top: 16px;
  display: block;
  width: fit-content;
`;

function ProfileField({ title, value }) {
  return (
    <div>
      <DktText holder="p" style={titleStyle}>{title}</DktText>
      <DktText holder="h4">{value}</DktText>
    </div>
  );
}

export default function ProfilePage() {
  const { data: profile } = useQuery('/people');
  const {
    displayName,
    email,
    fullName,
    github,
    linkedin,
    skills,
  } = profile;

  return (
    <div className={containerStyle}>
      <DktText holder="h2">Your information</DktText>
      <ProfileField title="Full name" value={fullName} />
      <ProfileField title="Display name" value={displayName} />
      <ProfileField title="Email" value={email} />
      <ProfileField title="LinkedIn" value={linkedin} />
      <ProfileField title="Github" value={github} />
      <ProfileField title="Skills" value={skills} />
      <DktButton negative href={Path.PROFILE_EDIT} style={editStyle}>Edit</DktButton>
    </div>
  );
}
