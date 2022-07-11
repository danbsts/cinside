import React from 'react';

import { ErrorMessage, Field, useField } from 'formik';
import { css, cx } from '@emotion/css';

import DktErrorField from 'shared/form/DktErrorField';
import DktText from 'shared/DktText';
import FormCheckboxField from 'shared/form/FormCheckboxField';
import PreviewField from 'shared/form/FormPreviewField';

const inputStyle = css`
  box-sizing: border-box;
  border: none;
  resize: vertical;
  background: #F4F4F4;
  border-radius: 10px;
  outline-color: #172B4D;
  outline-width: 1px;
  line-height: 36px;
  padding: 12px;
  font: 18px Raleway, serif;
`;
const wrapperStyle = css`
  width: 100%;
`;

export default function DktFormField({
  as = 'input',
  children,
  containerStyle,
  fieldStyle,
  name,
  placeholder,
  title,
  type = 'text',
  value,
}) {
  const [field] = useField({ name });

  // auto-resize for textarea/preview inputs
  const onChange = (event) => {
    field.onChange(event);
    if (as !== 'textarea' && type !== 'preview') return;
    const element = event.target;
    element.style.height = '5px';
    element.style.height = `${element.scrollHeight}px`;
  };

  if (type === 'preview') {
    return (
      <PreviewField
        inputStyle={cx(inputStyle, fieldStyle)}
        name={name}
        placeholder={placeholder}
        title={title}
        onChange={onChange}
      />
    );
  }

  if (type === 'radio' || type === 'checkbox') {
    return (
      <FormCheckboxField
        inputStyle={cx(inputStyle, fieldStyle)}
        name={name}
        title={title}
        type={type}
        value={value}
      />
    );
  }

  return (
    <div className={cx(wrapperStyle, containerStyle)}>
      <DktText holder="form-title">{title}</DktText>
      <Field
        as={as}
        className={cx(inputStyle, fieldStyle)}
        name={name}
        placeholder={placeholder}
        rows={4}
        type={type}
        onChange={onChange}
      >
        {children}
      </Field>
      <ErrorMessage component={DktErrorField} name={name} />
    </div>
  );
}
