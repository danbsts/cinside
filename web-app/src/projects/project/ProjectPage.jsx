import React, { useState } from 'react';

import { css } from '@emotion/css';
import format from 'date-fns/format';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { ProjectStatus, ProjectVisibility } from 'projects/project-constants';

import Contributors from 'projects/project/Contributors';
import DktButton from 'shared/DktButton';
import DktMarkdown from 'shared/DktMarkdown';
import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';
import ImageBox from 'projects/project/ImageBox';
import JoinModal from 'projects/project/JoinModal';
import ProjectTag from 'shared/ProjectTag';

const pageStyle = css`
  max-width: 90%;
  margin: auto;
  @media (min-width: 700px) {
    min-width: 750px;
  }
`;
const editStyle = css`
  height: 100%;
`;
const titleStyle = css`
  font-size: 40px;
`;
const wrapStyle = css`
  flex-wrap: wrap;
`;
const dateStyle = css`
  color: #235BFF;
  margin-bottom: 12px;
`;
const tagStyle = css`
  margin: 8px 8px 0 0;
`;
const tagContainerStyle = css`
  flex-wrap: wrap;
  width: fit-content;
  margin: 12px 0;
`;
const urlStyle = css`
  overflow-wrap: anywhere;
  margin: 8px 0 24px;
`;
const joinRequestStyle = css`
  margin: 8px auto 40px;
`;

function UrlBox({ title, url }) {
  return (
    <div>
      <DktText holder="h3">{title}</DktText>
      <DktText holder="h4" style={urlStyle}><a href={url}>{url}</a></DktText>
    </div>
  );
}

export default function ProjectPage() {
  const [modal, setModal] = useState(false);
  const { id } = useParams();
  const { data: project } = useQuery(`/projects/${id}`);
  const {
    contributors, description, images, isFounder, repository,
    stack, startDate, status, title, url, visibility,
  } = project;

  return (
    <FlexLayout flexDirection="column" style={pageStyle}>
      <FlexLayout justifyContent="space-between">
        <div>
          <DktText holder="h2" style={titleStyle}>{title}</DktText>
          <DktText holder="h4" style={dateStyle}>{format(new Date(startDate), 'LLLL, yyyy')}</DktText>
        </div>
        {isFounder && <DktButton negative href={`/projects/${id}/edit`} style={editStyle}>Edit</DktButton>}
      </FlexLayout>
      <FlexLayout justifyContent="space-between" style={wrapStyle}>
        <FlexLayout style={tagContainerStyle}>
          {stack.map((tech) => <ProjectTag key={tech} style={tagStyle}>{tech}</ProjectTag>)}
        </FlexLayout>
        <FlexLayout justifyContent="flex-end" style={tagContainerStyle}>
          <ProjectTag negative style={tagStyle}>{ProjectStatus[status]}</ProjectTag>
          <ProjectTag style={tagStyle}>{ProjectVisibility[visibility]}</ProjectTag>
        </FlexLayout>
      </FlexLayout>
      <DktMarkdown content={description} />
      <FlexLayout justifyContent="space-between" style={wrapStyle}>
        <UrlBox title="Url" url={url} />
        <UrlBox title="Github" url={repository} />
      </FlexLayout>
      <ImageBox images={images} />
      <DktText holder="h3">Contributors</DktText>
      <Contributors contributors={contributors} />
      <FlexLayout justifyContent="center" style={joinRequestStyle}>
        <DktButton negative onClick={() => setModal(true)}>Request to Join</DktButton>
      </FlexLayout>
      {modal && <JoinModal close={() => setModal(false)} projectId={id} />}
    </FlexLayout>
  );
}
