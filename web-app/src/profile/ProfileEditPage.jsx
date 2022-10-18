import React, { useEffect } from 'react';

import { Form, Formik } from 'formik';
import { useMutation, useQuery } from 'react-query';
import { css } from '@emotion/css';
import { useHistory } from 'react-router-dom';

import { Path } from 'router/routing';
import { dikastisApi } from 'dikastis-api';

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

function ProfileForm({ email, fullName }) {
  useEffect(() => { document.title = 'Edit profile'; });

  return (
    <div className={containerStyle}>
      <DktText holder="h2">Edit your information</DktText>
      <ProfileField title="Full name" value={fullName} />
      <ProfileField title="Email" value={email} />
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
  const history = useHistory();
  const { data: profile } = useQuery('/people');
  const {
    displayName,
    email,
    fullName,
    github,
    linkedin,
    skills,
  } = profile;
  const mutation = useMutation(
    (personForm) => dikastisApi.put('/people', personForm),
    {
      onSuccess: () => {
        history.push('/profile');
      },
      onError: (e) => {
        alert(e);
      }
    },
  );

  return (<>
    <Formik
      initialValues={{
        displayName,
        github,
        linkedin,
        skills,
      }}
      onSubmit={mutation.mutate}
    >
      <Form>
        <ProfileForm email={email} fullName={fullName} />
      </Form>
    </Formik>
    <form>
      <label htmlFor="displayName">Display Name</label>
      <input type="text" id="displayName"/>
      <label htmlFor="linkedin">Linkedin</label>
      <input type="url" id="linkedin"/>
      <label htmlFor="github">Github</label>
      <input type="url" id="github"/>
      <label htmlFor="skills">Skills</label>
      <input type="text" />
    </form>
  </>

  );
}
