import React, { useState } from 'react';

import { ErrorMessage, Field, useField } from 'formik';
import { css, cx } from '@emotion/css';

import DktErrorField from 'shared/form/DktErrorField';
import DktMarkdown from 'shared/DktMarkdown';
import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';

const borderStyle = css`
  border-bottom: 4px solid #235BFF;
`;
const clickableStyle = css`
  padding: 8px 12px 4px;
  cursor: pointer;
  :hover {
    background-color: #313131;
  }
`;
const textareaStyle = css`
  width: 100%;
  resize: none;
`;

export default function PreviewField({
  inputStyle, name, onChange, placeholder, title,
}) {
  const [selectedField, selectField] = useState(title);
  const [field] = useField({ name });
  const labels = [title, 'Preview'];

  const getStyling = (text) => {
    if (text === selectedField) return cx(borderStyle, clickableStyle);
    return clickableStyle;
  };

  return (
    <div>
      <FlexLayout>
        {labels.map((label) => (
          <div key={label} role="presentation" onClick={() => selectField(label)}>
            <DktText holder="form-title" style={getStyling(label)}>{label}</DktText>
          </div>
        ))}
      </FlexLayout>
      {selectedField === title
        ? (
          <Field
            as="textarea"
            className={cx(inputStyle, textareaStyle)}
            name={name}
            placeholder={placeholder}
            rows={15}
            onChange={onChange}
          />
        )
        : (
          <div className={inputStyle}>
            <DktMarkdown content={field.value} />
          </div>
        )}
      <ErrorMessage component={DktErrorField} name={name} />
    </div>
  );
}
