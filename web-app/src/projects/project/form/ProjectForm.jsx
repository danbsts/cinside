import React from 'react';

import { Form, Formik } from 'formik';
import { css } from '@emotion/css';

import DktButton from 'shared/DktButton';
import DktFormField from 'shared/form/DktFormField';
import FlexLayout from 'shared/FlexLayout';
import ProjectContributorsForm from './ProjectContributorsForm';

const pageStyle = css`
  max-width: 90%;
  margin: auto;
  @media (min-width: 700px) {
    min-width: 750px;
  }
`;
const fullWidthStyle = css`
  width: 100%;
`;

export default function ProjectForm({
  contributors,
  description,
  github,
  stack,
  startDate,
  status,
  title,
  url,
  visibility,
}) {
  return (
    <Formik
      initialValues={{
        contributorName: '',
        contributorRole: '',
        contributors: contributors ?? [],
        description: description ?? '',
        github: github ?? '',
        stack: stack ?? [],
        startDate: startDate ?? '',
        status: status ?? '',
        title: title ?? '',
        url: url ?? '',
        visibility: visibility ?? '',
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      <Form>
        <FlexLayout flexDirection="column" style={pageStyle}>
          <DktFormField fieldStyle={fullWidthStyle} name="title" placeholder="Your project name" title="Title" />
          <DktFormField name="startDate" placeholder="2022/30/06" title="Start date" type="date" />
          <DktFormField name="description" placeholder="Project description (this container accepts markdown)" title="Description" type="preview" />
          <DktFormField fieldStyle={fullWidthStyle} name="url" placeholder="https://mywebsite.com" title="Url" />
          <DktFormField fieldStyle={fullWidthStyle} name="github" placeholder="https://github.com/user/project" title="Github" />
          <ProjectContributorsForm />
          <FlexLayout justifyContent="center">
            <DktButton negative>Cancel</DktButton>
            <DktButton>Save</DktButton>
          </FlexLayout>
        </FlexLayout>
      </Form>
    </Formik>
  );
}
