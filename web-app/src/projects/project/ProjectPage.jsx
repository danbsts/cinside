import React from 'react';

import { css } from '@emotion/css';

import DktButton from 'shared/DktButton';
import DktMarkdown from 'shared/DktMarkdown';
import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';
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
const contributorsContainerStyle = css`
  flex-wrap: wrap;
  margin: 12px 0;
`;
const contributorStyle = css`
  margin-bottom: 24px;
`;
const roleStyle = css`
  font-size: 16px;
  color: #235bff;
`;

function UrlBox({ title, url }) {
  return (
    <div>
      <DktText holder="h3">{title}</DktText>
      <DktText holder="h4" style={urlStyle}><a href={url}>{url}</a></DktText>
    </div>
  );
}

function ContributorBox({ displayName, role }) {
  return (
    <div className={contributorStyle}>
      <DktText holder="h4">{displayName}</DktText>
      <DktText holder="p" style={roleStyle}>{role}</DktText>
    </div>
  );
}

export default function ProjectPage() {
  return (
    <FlexLayout flexDirection="column" style={pageStyle}>
      <FlexLayout justifyContent="space-between">
        <div>
          <DktText holder="h2" style={titleStyle}>Dikastis</DktText>
          <DktText holder="h4" style={dateStyle}>Dezembro, 2021</DktText>
        </div>
        <DktButton negative style={editStyle}>Edit</DktButton>
      </FlexLayout>
      <FlexLayout justifyContent="space-between" style={wrapStyle}>
        <FlexLayout style={tagContainerStyle}>
          {['CSS', 'Java', 'Javascript', 'RabbitMQ', 'Javascript', 'RabbitMQ'].map((technology) => <ProjectTag style={tagStyle}>{technology}</ProjectTag>)}
        </FlexLayout>
        <FlexLayout justifyContent="flex-end" style={tagContainerStyle}>
          <ProjectTag negative style={tagStyle}>New</ProjectTag>
          <ProjectTag style={tagStyle}>Private</ProjectTag>
        </FlexLayout>
      </FlexLayout>
      <DktMarkdown content="Testando meu texto em markdown aqui" />
      <FlexLayout justifyContent="space-between" style={wrapStyle}>
        <UrlBox title="Url" url="https://dikastis.com.br/asdhasjkdhaksdhkasdgksa" />
        <UrlBox title="Github" url="https://github.com" />
      </FlexLayout>
      <DktText holder="h3">Contributors</DktText>
      <FlexLayout justifyContent="space-between" style={contributorsContainerStyle}>
        {[
          { displayName: 'Daniel Bastos', role: 'Full-stack engineer' },
          { displayName: 'Paulo Veloso', role: 'Backend Engineer' },
          { displayName: 'Paulo Veloso', role: 'Backend Engineer' },
          { displayName: 'Paulo Veloso', role: 'Backend Engineer' },
        ].map(({ displayName, role }) => <ContributorBox displayName={displayName} role={role} />)}
      </FlexLayout>
    </FlexLayout>
  );
}
