import React from 'react';

import { css } from '@emotion/css';
import { useField } from 'formik';

import ClickableIcon from 'shared/ClickableIcon';
import DktButton from 'shared/DktButton';
import DktFormField from 'shared/form/DktFormField';
import FlexLayout from 'shared/FlexLayout';

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
const containerStyle = css`
  margin-top: 12px;
  overflow-x: scroll;
`;
const imgStyle = css`
  max-width: 400px;
  margin-right: 20px;
`;

function EditImage({ images, remove }) {
  return (
    <FlexLayout alignItems="center" style={containerStyle}>
      {images.map((imgUrl, idx) => (
        <div key={imgUrl}>
          <img alt={`Screenshot ${idx}`} className={imgStyle} src={imgUrl} />
          <ClickableIcon alt="Remove" src={removeIcon} onClick={() => remove(imgUrl)} />
        </div>
      ))}
    </FlexLayout>
  );
}

export default function ProejctImageForm() {
  const [{ value: imageUrl }, , { setValue: setImageUrl }] = useField('imageUrl');
  const [{ value: images }, , { setValue: setImages }] = useField('images');

  const addImage = () => {
    if (images.includes(imageUrl)) {
      setImageUrl('');
      return;
    }
    setImages([...images, imageUrl]);
    setImageUrl('');
  };

  const remove = (name) => setImages(images.filter((url) => url !== name));

  return (
    <>
      <FlexLayout alignItems="flex-end" justifyContent="space-between" style={flexWrapStyle}>
        <DktFormField containerStyle={fitContentStyle} name="imageUrl" placeholder="Image URL" title="Images" />
        <DktButton negative style={buttonLayout} onClick={addImage}>Add</DktButton>
      </FlexLayout>
      <EditImage images={images} remove={remove} />
    </>
  );
}
