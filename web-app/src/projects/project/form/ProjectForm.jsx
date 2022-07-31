import React from 'react';

import { Form, Formik } from 'formik';
import { css } from '@emotion/css';
import { format } from 'date-fns';

import {
  ProjectStatus, ProjectStatusToKey, ProjectVisibility, ProjectVisibilityToKey,
} from 'projects/project-constants';
import DktButton from 'shared/DktButton';
import DktFormField from 'shared/form/DktFormField';
import FlexLayout from 'shared/FlexLayout';
import ProejctImageForm from 'projects/project/form/ProejctImageForm';
import ProjectContributorsForm from 'projects/project/form/ProjectContributorsForm';
import ProjectStackForm from 'projects/project/form/ProjectStackForm';

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

export default function ProjectForm({ deleteOnClick, initialValues, submit }) {
  const startDate = format(getStartDate(initialValues), 'yyyy-MM-dd');

  const onSubmit = (values) => {
    const { status, visibility } = values;
    const parseStartDate = new Date(values.startDate);
    submit({
      ...values,
      startDate: `${format(parseStartDate, 'yyyy-MM-dd')}T00:00:00`,
      status: ProjectStatusToKey(status),
      visibility: ProjectVisibilityToKey(visibility),
    });
  };

  const cancelLink = initialValues ? `/projects/${initialValues.id}` : '/projects';

  return (
    <Formik
      initialValues={{
        contributorName: '',
        contributorRole: '',
        contributors: [],
        description: '',
        imageUrl: '',
        images: [],
        repository: '',
        stack: [],
        stackName: '',
        status: ProjectStatus.NEW_IDEA,
        title: '',
        url: '',
        visibility: ProjectVisibility.PUBLIC,
        ...initialValues,
        // eslint-disable-next-line sort-keys
        startDate,
      }}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}
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
          <ProejctImageForm />
          <ProjectContributorsForm />
          <FlexLayout justifyContent="center">
            <DktButton negative href={cancelLink}>Cancel</DktButton>
            {deleteOnClick && (
            <DktButton
              negative
              style={buttonMarginStyle}
              onClick={deleteOnClick}
            >
              Delete
            </DktButton>
            )}
            <DktButton submit style={buttonMarginStyle}>Save</DktButton>
          </FlexLayout>
        </FlexLayout>
      </Form>
    </Formik>
  );
}
