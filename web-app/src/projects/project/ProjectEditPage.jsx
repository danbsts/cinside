import React from 'react';

import { Form, Formik } from 'formik';
import { css } from '@emotion/css';

import Contributors from 'projects/project/Contributors';
import DktButton from 'shared/DktButton';
import DktFormField from 'shared/form/DktFormField';
import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';

const pageStyle = css`
  max-width: 90%;
  margin: auto;
  @media (min-width: 700px) {
    min-width: 750px;
  }
`;
const contributorsStyle = css`
  margin-top: 30px;
  font-weight: 600;
  color: #235BFF;
`;
const buttonLayout = css`
  height: fit-content;
`;
const flexWrapStyle = css`
  flex-wrap: wrap;
`;
const fullWidthStyle = css`
  width: 100%;
`;
const fitContentStyle = css`
  width: fit-content;
`;

export default function ProjectEditPage() {
  return (
    <Formik
      initialValues={{
        contributors: [],
        description: '',
        github: '',
        stack: [],
        startDate: '',
        status: '',
        title: '',
        url: '',
        visibility: '',
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      <Form>
        <FlexLayout flexDirection="column" style={pageStyle}>
          <DktFormField fieldStyle={fullWidthStyle} name="title" placeholder="Your project name" title="Title" />
          <DktFormField name="startDate" placeholder="2022/30/06" title="Start date" type="date" />
          <DktFormField name="description" placeholder="Project description (this container accepts markdown)" title="Description" type="preview" />
          <DktFormField fieldStyle={fullWidthStyle} name="url" placeholder="https://mywebsite.com" title="Url" />
          <DktFormField fieldStyle={fullWidthStyle} name="github" placeholder="https://github.com/user/project" title="Github" />
          <DktText holder="h4" style={contributorsStyle}>Contributors</DktText>
          <FlexLayout alignItems="flex-end" justifyContent="space-between" style={flexWrapStyle}>
            <DktFormField containerStyle={fitContentStyle} name="contributorName" placeholder="Display name" title="Name" />
            <DktFormField containerStyle={fitContentStyle} name="contributorRole" placeholder="Software Engineer" title="Role" />
            <DktButton negative style={buttonLayout}>Add</DktButton>
          </FlexLayout>
          <Contributors contributors={[]} />
          <FlexLayout justifyContent="center">
            <DktButton negative>Cancel</DktButton>
            <DktButton>Save</DktButton>
          </FlexLayout>
        </FlexLayout>
      </Form>
    </Formik>
  );
}
