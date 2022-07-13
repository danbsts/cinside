import React from 'react';

import { css, cx } from '@emotion/css';
import { Field } from 'formik';

import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';

const containerStyle = css`
  margin: 20px 0 8px;
  width: fit-content;
`;
const textStyle = css`
  font-weight: 600;
  color: #EEBF4D;
  margin-left: 8px;
`;
const buttonStyle = css`
  appearance: none;
  outline: none;
  border-radius: 100%;
  padding: 6px;
  width: 8px;
  height: 8px;
  box-sizing: content-box;
  border: 2px solid #F4F4F4;
  background-color: #F4F4F4;
  transition: 300ms ease-in;
  :checked {
    padding: 6px;
    width: 8px;
    height: 8px;
    box-sizing: content-box;
    border: 2px solid #172B4D;
    background-color: #EEBF4D;
    background-clip: content-box;
  }
`;

export default function FormCheckboxField({
  inputStyle, name, title, type, value,
}) {
  return (
    <FlexLayout alignItems="center" style={containerStyle}>
      <Field className={cx(inputStyle, buttonStyle)} name={name} type={type} value={value} />
      <DktText holder="h4" style={textStyle}>{title}</DktText>
    </FlexLayout>
  );
}
