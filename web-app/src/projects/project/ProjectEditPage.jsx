import React from 'react';

import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import { dikastisApi } from 'dikastis-api';

import ProjectForm from 'projects/project/form/ProjectForm';

export default function ProjectEditPage() {
  const { id } = useParams();
  const { data: project } = useQuery(`/projects/${id}`);
  const history = useHistory();
  const mutation = useMutation(
    (projectForm) => dikastisApi.put('/projects', projectForm),
    {
      onSuccess: () => {
        history.push(`/projects/${id}`);
      },
    },
  );

  const submit = (form) => mutation.mutate({ id, ...form });

  return <ProjectForm initialValues={project} submit={submit} />;
}
