import React from 'react';

import { Form, Formik } from 'formik';
import { css } from '@emotion/css';

import DktButton from 'shared/DktButton';
import DktFormField from 'shared/form/DktFormField';
import FlexLayout from 'shared/FlexLayout';
import ProjectBox from './ProjectBox';

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

const visibility = {
  ALL: 'All',
  PRIVATE: 'Private',
  PUBLIC: 'Public',
};
const status = {
  ALL: 'All',
  NEW_IDEA: 'New/Idea',
  // eslint-disable-next-line sort-keys
  IN_DEVELOPMENT: 'In development',
  // eslint-disable-next-line sort-keys
  DEPLOYED_MAINTAINING: 'Deployed/Maintaining',
};

function ProjectsSearchForm({ children }) {
  return (
    <Formik
      initialValues={{
        status: visibility.ALL,
        visibility: visibility.ALL,
      }}
      validateOnChange={false}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>
        {children}
      </Form>
    </Formik>
  );
}

export default function ProjectListPage() {
  return (
    <ProjectsSearchForm>
      <FlexLayout justifyContent="space-between" style={searchContainerStyle}>
        <FlexLayout style={filterContainerStyle}>
          <DktFormField as="select" name="visibility" placeholder="All" title="Visibility">
            {Object.entries(visibility).map(([value, display]) => (
              <option key={value} value={value}>{display}</option>
            ))}
          </DktFormField>
          <DktFormField as="select" name="status" placeholder="All" title="Status">
            {Object.entries(status).map(([value, display]) => (
              <option key={value} value={value}>{display}</option>
            ))}
          </DktFormField>
        </FlexLayout>
        <DktButton negative style={addButtonStyle}>Add project</DktButton>
      </FlexLayout>
      <ProjectBox />
    </ProjectsSearchForm>
  );
}
