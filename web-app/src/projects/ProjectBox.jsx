import React from 'react';

import { Link } from 'react-router-dom';
import { css } from '@emotion/css';
import format from 'date-fns/format';

import { ProjectStatus, ProjectVisibility } from 'projects/project-constants';

import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';
import ProjectTag from 'shared/ProjectTag';

const boxStyle = css`
  margin: 40px 0 0;
  border-radius: 10px;
  padding: 22px 32px;
  :hover {
    background-color: #313131;
    box-shadow: 3px 4px 10px rgba(146, 146, 146, 0.25);
    cursor: pointer;
  }
`;
const releaseDateStyle = css`
  color: #235BFF;
`;
const tagStyle = css`
  margin-left: 4px;
`;
const stackContainerStyle = css`
  margin-top: 12px;
  flex-wrap: wrap;
`;
const stackTagStyle = css`
  margin-right: 4px;
`;
const descriptionStyle = css`
  margin-top: 12px;
`;

export default function ProjectBox({ project }) {
  const {
    description, id, stack, startDate, status, title, visibility,
  } = project;

  return (
    <div className={boxStyle}>
      <Link to={`/projects/${id}`}>
        <FlexLayout>
          <FlexLayout justifyContent="space-between">
            <div>
              <DktText holder="h2">{title}</DktText>
              <DktText holder="h4" style={releaseDateStyle}>{format(new Date(startDate), 'LLLL, yyyy')}</DktText>
            </div>
            <FlexLayout alignItems="flex-start" justifyContent="flex-end">
              <ProjectTag negative>{ProjectStatus[status]}</ProjectTag>
              <ProjectTag style={tagStyle}>{ProjectVisibility[visibility]}</ProjectTag>
            </FlexLayout>
          </FlexLayout>
        </FlexLayout>
        <FlexLayout style={stackContainerStyle}>
          {stack.map(((tech) => (
            <ProjectTag key={tech} style={stackTagStyle}>{tech}</ProjectTag>)
          ))}
        </FlexLayout>
        <DktText holder="p" style={descriptionStyle}>{description}</DktText>
      </Link>
    </div>
  );
}
