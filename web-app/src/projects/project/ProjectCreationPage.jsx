import React from 'react';

import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';

import { dikastisApi } from 'dikastis-api';

import ProjectForm from 'projects/project/form/ProjectForm';

export default function ProjectCreationPage() {
  const history = useHistory();
  const mutation = useMutation(
    (projectForm) => dikastisApi.post('/projects', projectForm),
    {
      onSuccess: ({ data }) => {
        const { id } = data;
        history.push(`/projects/${id}`);
      },
    },
  );

  return <ProjectForm submit={mutation.mutate} />;
}
