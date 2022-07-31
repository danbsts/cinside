import React from 'react';

import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import { dikastisApi } from 'dikastis-api';

import ProjectForm from 'projects/project/form/ProjectForm';

export default function ProjectEditPage() {
  const { id } = useParams();
  const { data: project } = useQuery(`/projects/${id}`);
  const history = useHistory();
  const editProject = useMutation(
    (projectForm) => dikastisApi.put('/projects', projectForm),
    {
      onSuccess: () => {
        history.push(`/projects/${id}`);
      },
    },
  );
  const deleteProject = useMutation(
    () => dikastisApi.delete(`/projects/${id}`),
    {
      onSuccess: () => {
        history.push('/projects');
      },
    },
  );

  const submit = (form) => editProject.mutate({ id, ...form });

  const deleteProjectOnClick = () => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    if (confirm('Are you sure you want to delete?')) {
      deleteProject.mutate();
    }
  };

  return (
    <ProjectForm
      deleteOnClick={deleteProjectOnClick}
      initialValues={project}
      submit={submit}
    />
  );
}
