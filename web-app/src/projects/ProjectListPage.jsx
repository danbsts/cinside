import React from 'react';

import { Form, Formik } from 'formik';
import { css } from '@emotion/css';
import { useQuery } from 'react-query';
import { useQueryParams } from 'router/useDikastisRouting';

import DktButton from 'shared/DktButton';
import DktFormField from 'shared/form/DktFormField';
import FlexLayout from 'shared/FlexLayout';
import ProjectBox from 'projects/ProjectBox';

const searchContainerStyle = css`
  flex-wrap: wrap;
  width: auto;
  padding: 22px 32px;
`;
const filterContainerStyle = css`
  width: auto;
`;
const addButtonStyle = css`
  align-self: flex-end;
  margin: 20px 0 0;
`;

const ProjectVisibility = {
  ALL: 'All',
  PRIVATE: 'Private',
  PUBLIC: 'Public',
};
const ProjectStatus = {
  ALL: 'All',
  NEW_IDEA: 'New/Idea',
  // eslint-disable-next-line sort-keys
  IN_DEVELOPMENT: 'In development',
  // eslint-disable-next-line sort-keys
  DEPLOYED_MAINTAINING: 'Deployed/Maintaining',
};

function ProjectList({ values }) {
  const { page, status, visibility } = values;
  const { data } = useQuery(`/projects?visibility=${visibility}&status=${status}&page=${page}`);
  const { content } = data;
  console.log(content);
  return (
    <Form>
      <FlexLayout justifyContent="space-between" style={searchContainerStyle}>
        <FlexLayout style={filterContainerStyle}>
          <DktFormField as="select" name="visibility" placeholder="All" title="Visibility">
            {Object.entries(ProjectVisibility).map(([value, display]) => (
              <option key={value} value={value}>{display}</option>
            ))}
          </DktFormField>
          <DktFormField as="select" name="status" placeholder="All" title="Status">
            {Object.entries(ProjectStatus).map(([value, display]) => (
              <option key={value} value={value}>{display}</option>
            ))}
          </DktFormField>
        </FlexLayout>
        <DktButton negative style={addButtonStyle}>Add project</DktButton>
      </FlexLayout>
      {content.map((project) => <ProjectBox project={project} />)}
    </Form>
  );
}

export default function ProjectListPage() {
  const { page, status, visibility } = useQueryParams();
  console.log(status);
  return (
    <Formik
      initialValues={{
        page: page ?? 0,
        status: status ?? ProjectStatus.ALL,
        visibility: visibility ?? ProjectVisibility.ALL,
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {ProjectList}
    </Formik>
  );
}
