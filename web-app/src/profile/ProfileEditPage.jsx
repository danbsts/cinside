import React from 'react';

import { Form, Formik } from 'formik';
import { css } from '@emotion/css';

import { Path } from 'router/routing';

import DktButton from 'shared/DktButton';
import DktFormField from 'shared/form/DktFormField';
import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';

const containerStyle = css`
  width: fit-content;
  max-width: 1000px;
  margin: auto;
`;
const titleStyle = css`
  margin: 18px 0 4px;
  color: #235BFF;
`;
const inputStyle = css`
  width: 100%;
`;
const buttonContainerStyle = css`
  margin-top: 16px;
  a:first-child {
    margin-right: 12px;
  }
`;

function ProfileField({ title, value }) {
  return (
    <div>
      <DktText holder="p" style={titleStyle}>{title}</DktText>
      <DktText holder="h4">{value}</DktText>
    </div>
  );
}

function ProfileForm() {
  return (
    <div className={containerStyle}>
      <DktText holder="h2">Edit your information</DktText>
      <ProfileField title="Full name" value="Daniel Bastos" />
      <ProfileField title="Email" value="dan@gmail.com" />
      <DktFormField fieldStyle={inputStyle} name="displayName" placeholder="Daniel Bastos" title="Display name" />
      <DktFormField fieldStyle={inputStyle} name="linkedin" placeholder="https://linkedin.com/in/dan-bastos" title="LinkedIn" />
      <DktFormField fieldStyle={inputStyle} name="github" placeholder="https://github.com/danbsts" title="Github" />
      <DktFormField fieldStyle={inputStyle} name="skills" placeholder="CSS, HTML, Javascript, Java" title="Skills" />
      <FlexLayout style={buttonContainerStyle}>
        <DktButton negative href={Path.PROFILE}>Cancel</DktButton>
        <DktButton submit>Save</DktButton>
      </FlexLayout>
    </div>
  );
}

export default function ProfileEditPage() {
  return (
    <Formik
      initialValues={{
        displayName: '',
        github: '',
        linkedin: '',
        skils: '',
      }}
    >
      <Form>
        <ProfileForm />
      </Form>
    </Formik>
  );
}
