import React, { useEffect } from 'react';

import { Form, Formik } from 'formik';
import { css } from '@emotion/css';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useQueryParams } from 'router/useDikastisRouting';

import {
  ProjectStatus, ProjectStatusToKey, ProjectVisibility, ProjectVisibilityToKey,
} from 'projects/project-constants';
import { Path } from 'router/routing';

import DktButton from 'shared/DktButton';
import DktFormField from 'shared/form/DktFormField';
import FlexLayout from 'shared/FlexLayout';
import PaginationBox from 'shared/PaginationBox';
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

function getFilters(visibility, status, page) {
  const filters = [];

  if (visibility !== ProjectVisibility.ALL && visibility !== ProjectVisibility.ALL.toUpperCase()) {
    filters.push(`visibility=${ProjectVisibilityToKey(visibility)}`);
  }
  if (status !== ProjectStatus.ALL && status !== ProjectStatus.ALL.toUpperCase()) {
    filters.push(`status=${ProjectStatusToKey(status)}`);
  }
  filters.push(`page=${page ?? 1}`);

  return filters.join('&');
}

function ProjectList({ values }) {
  const { page: qPage, status: qStatus, visibility: qVisibility } = useQueryParams();
  const history = useHistory();
  const { page, status, visibility } = values;
  const { data } = useQuery(`/projects?${getFilters(visibility, status, page)}`);
  const {
    content, empty, pageNumber, totalPages,
  } = data;

  useEffect(() => { document.title = 'All projects'; }, []);

  useEffect(() => {
    if (page !== qPage || qStatus !== status || qVisibility !== visibility) {
      history.push(`/projects?visibility=${visibility}&status=${status}&page=${page}`);
    }
  }, [values]);

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
        <DktButton negative href={Path.PROJECTS_NEW} style={addButtonStyle}>Add project</DktButton>
      </FlexLayout>
      {!empty && content.map((project) => <ProjectBox key={project.id} project={project} />)}
      <PaginationBox currentPage={pageNumber} totalPages={totalPages} />
    </Form>
  );
}

export default function ProjectListPage() {
  const { page, status, visibility } = useQueryParams();

  return (
    <Formik
      initialValues={{
        page: page ?? 1,
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
