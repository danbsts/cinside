import React from 'react';

import { css } from '@emotion/css';

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

export default function ProjectBox() {
  return (
    <div className={boxStyle}>
      <FlexLayout>
        <FlexLayout justifyContent="space-between">
          <div>
            <DktText holder="h2">Dikastis</DktText>
            <DktText holder="h4" style={releaseDateStyle}>Dikastis</DktText>
          </div>
          <FlexLayout alignItems="flex-start" justifyContent="flex-end">
            <ProjectTag negative>New</ProjectTag>
            <ProjectTag style={tagStyle}>Private</ProjectTag>
          </FlexLayout>
        </FlexLayout>
      </FlexLayout>
      <FlexLayout style={stackContainerStyle}>
        <ProjectTag style={stackTagStyle}>CSS</ProjectTag>
        <ProjectTag style={stackTagStyle}>Java</ProjectTag>
        <ProjectTag style={stackTagStyle}>Javascript</ProjectTag>
        <ProjectTag style={stackTagStyle}>React</ProjectTag>
      </FlexLayout>
      <DktText holder="p" style={descriptionStyle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard.</DktText>
    </div>
  );
}
