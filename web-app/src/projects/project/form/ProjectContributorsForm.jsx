import React from 'react';

import { css } from '@emotion/css';
import { useField } from 'formik';

import Contributors from 'projects/project/Contributors';
import DktButton from 'shared/DktButton';
import DktFormField from 'shared/form/DktFormField';
import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';

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
const fitContentStyle = css`
  width: fit-content;
`;

export default function ProjectContributorsForm() {
  const [{ value: contributorName }, , { setValue: setName }] = useField('contributorName');
  const [{ value: contributorRole }, , { setValue: setRole }] = useField('contributorRole');
  const [{ value: contributors }, , { setValue: setContributors }] = useField('contributors');

  const addContributor = () => {
    setContributors([...contributors, { name: contributorName, role: contributorRole }]);
    setName('');
    setRole('');
  };

  const remove = (name) => setContributors(contributors.filter((c) => c.name !== name));

  return (
    <>
      <DktText holder="h4" style={contributorsStyle}>Contributors</DktText>
      <FlexLayout alignItems="flex-end" justifyContent="space-between" style={flexWrapStyle}>
        <DktFormField containerStyle={fitContentStyle} name="contributorName" placeholder="Display name" title="Name" />
        <DktFormField containerStyle={fitContentStyle} name="contributorRole" placeholder="Software Engineer" title="Role" />
        <DktButton negative style={buttonLayout} onClick={addContributor}>Add</DktButton>
      </FlexLayout>
      <Contributors contributors={contributors} remove={remove} />
    </>
  );
}
