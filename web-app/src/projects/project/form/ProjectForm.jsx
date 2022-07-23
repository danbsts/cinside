import React from 'react';

import { Form, Formik } from 'formik';
import { css } from '@emotion/css';
import { format } from 'date-fns';

import { ProjectStatus, ProjectVisibility } from 'projects/project-constants';
import DktButton from 'shared/DktButton';
import DktFormField from 'shared/form/DktFormField';
import FlexLayout from 'shared/FlexLayout';
import ProjectContributorsForm from './ProjectContributorsForm';
import ProjectStackForm from './ProjectStackForm';

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
const buttonMarginStyle = css`
  margin-left: 20px;
`;

function getStartDate(initialValues) {
  if (!initialValues) {
    return new Date();
  }
  const { startDate } = initialValues;
  return new Date(startDate);
}

export default function ProjectForm({ initialValues, submit }) {
  const startDate = format(getStartDate(initialValues), 'yyyy-MM-dd');

  return (
    <Formik
      initialValues={{
        contributorName: '',
        contributorRole: '',
        contributors: [],
        description: '',
        repository: '',
        stack: [],
        stackName: '',
        status: '',
        title: '',
        url: '',
        visibility: '',
        ...initialValues,
        startDate,
      }}
      submit={submit}
      validateOnBlur={false}
      validateOnChange={false}
    >
      <Form>
        <FlexLayout flexDirection="column" style={pageStyle}>
          <DktFormField fieldStyle={fullWidthStyle} name="title" placeholder="Your project name" title="Title" />
          <DktFormField name="startDate" placeholder="2022/30/06" title="Start date" type="date" />
          <DktFormField as="select" name="visibility" title="Visibility">
            {Object.entries(ProjectVisibility)
              .filter(([, value]) => value !== ProjectVisibility.ALL).map(([value, display]) => (
                <option key={value} value={value}>{display}</option>
              ))}
          </DktFormField>
          <DktFormField as="select" name="status" title="Status">
            {Object.entries(ProjectStatus)
              .filter(([, value]) => value !== ProjectStatus.ALL).map(([value, display]) => (
                <option key={value} value={value}>{display}</option>
              ))}
          </DktFormField>
          <ProjectStackForm />
          <DktFormField name="description" placeholder="Project description (this container accepts markdown)" title="Description" type="preview" />
          <DktFormField fieldStyle={fullWidthStyle} name="url" placeholder="https://mywebsite.com" title="Url" />
          <DktFormField fieldStyle={fullWidthStyle} name="repository" placeholder="https://github.com/user/project" title="Github" />
          <ProjectContributorsForm />
          <FlexLayout justifyContent="center">
            <DktButton negative>Cancel</DktButton>
            <DktButton style={buttonMarginStyle}>Save</DktButton>
          </FlexLayout>
        </FlexLayout>
      </Form>
    </Formik>
  );
}
