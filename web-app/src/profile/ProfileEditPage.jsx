import React, { useEffect } from 'react';

import { Form, Formik } from 'formik';
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from 'react-query';
import { css } from '@emotion/css';
import { useHistory } from 'react-router-dom';

import { Path } from 'router/routing';
import { dikastisApi } from 'dikastis-api';

import DktButton from 'shared/DktButton';
import DktFormField from 'shared/form/DktFormField';
import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';

let counter = 0;

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
  const { register, handleSubmit, formState: { errors } } = useForm();
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

  let renderCount = 0;

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
    <form onSubmit={handleSubmit(mutation.mutate)}>
      <label htmlFor="displayName">Display Name</label>
      <input type="text" id="displayName" {...register("displayName", { required: true })} defaultValue={displayName} />
      <label htmlFor="linkedin">Linkedin</label>
      <input type="url" id="linkedin" {...register("linkedin", {
        required: "A linkedin profile is required",
        pattern: {
          value: /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/,
          message: "It must be a valid linkedin profile url"
      }
      })} defaultValue={linkedin} />
      {errors.linkedin &&
        <div>{errors.linkedin.message}</div>}
      <label htmlFor="github">Github</label>
      <input type="url" id="github" {...register("github", { 
        required: "A github profile is required",
        pattern: {
          value: /^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/,
          message: "It must be a valid github user profile url"
        }
      })} defaultValue={github} />
      {errors.github &&
        <div>{errors.github.message}</div>}
      <label htmlFor="skills">Skills</label>
      <input type="text" {...register("skills")} defaultValue={skills} />
      <p>Render: <span>{counter++}</span></p>
      <input type="submit" value="submit" />
    </form>
  </>

  );
}
