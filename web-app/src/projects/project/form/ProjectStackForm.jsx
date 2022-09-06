import React from 'react';

import { css } from '@emotion/css';
import { useField } from 'formik';

import ClickableIcon from 'shared/ClickableIcon';
import DktButton from 'shared/DktButton';
import DktFormField from 'shared/form/DktFormField';
import FlexLayout from 'shared/FlexLayout';
import ProjectTag from 'shared/ProjectTag';

import removeIcon from 'assets/remove-cross.svg';

const buttonLayout = css`
  height: fit-content;
`;
const flexWrapStyle = css`
  flex-wrap: wrap;
`;
const fitContentStyle = css`
  width: fit-content;
`;
const stackStyle = css`
  margin-top: 12px;
`;

function EditStack({ remove, stack }) {
  return stack.map((tech) => (
    <FlexLayout key={tech} alignItems="center" style={stackStyle}>
      <ProjectTag key={tech}>{tech}</ProjectTag>
      <ClickableIcon alt="Remove" src={removeIcon} onClick={() => remove(tech)} />
    </FlexLayout>
  ));
}

export default function ProjectStackForm() {
  const [{ value: stackName }, , { setValue: setStackName }] = useField('stackName');
  const [{ value: stack }, , { setValue: setStack }] = useField('stack');

  const addStack = () => {
    const toAdd = [];
    stackName.split(',').forEach((s) => {
      if (stack.includes(s)) {
        setStackName('');
        return;
      }
      toAdd.push(s);
    });
    setStack([...stack, ...toAdd]);
    setStackName('');
  };

  const remove = (name) => setStack(stack.filter((tech) => tech !== name));

  return (
    <>
      <FlexLayout alignItems="flex-end" justifyContent="space-between" style={flexWrapStyle}>
        <DktFormField containerStyle={fitContentStyle} name="stackName" placeholder="Java" title="Stack" />
        <DktButton negative style={buttonLayout} onClick={addStack}>Add</DktButton>
      </FlexLayout>
      <EditStack remove={remove} stack={stack} />
    </>
  );
}
