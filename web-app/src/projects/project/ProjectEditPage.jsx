import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import ProjectForm from 'projects/project/form/ProjectForm';

export default function ProjectEditPage() {
  const { id } = useParams();
  const { data: project } = useQuery(`/projects/${id}`);
  console.log(project);
  return <ProjectForm initialValues={project} />;
}
