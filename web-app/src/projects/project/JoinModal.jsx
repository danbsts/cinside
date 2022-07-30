import React from 'react';

import { css } from '@emotion/css';
import { useMutation } from 'react-query';

import { dikastisApi } from 'dikastis-api';

import DktButton from 'shared/DktButton';
import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';
import { useToast } from 'toast/toast-context';

const modalStyle = css`
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;
const containerStyle = css`
  max-width: 300px;
  border: 3px solid #235BFF;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.71);
  border-radius: 20px;
  background: #000000;
  padding: 12px 40px;
`;
const titleStyle = css`
  margin: 20px auto;
`;
const buttonStyle = css`
  margin: 20px auto;
`;

export default function JoinModal({ close, projectId }) {
  const { addToast } = useToast();
  const mutation = useMutation(
    () => dikastisApi.post(`/projects/${projectId}/join`),
    {
      onSuccess: () => {
        close();
        addToast(200, 'Request sent :D');
      },
    },
  );

  return (
    <FlexLayout alignItems="center" justifyContent="center" style={modalStyle}>
      <FlexLayout alignItems="center" flexDirection="column" style={containerStyle}>
        <DktText holder="h3" style={titleStyle}>Join request</DktText>
        <DktText>
          By clicking &quot;Agree and Send&quot; you&apos;re acknowledging
          that your contact information will be shared with the project
          owner (including name, e-mail, skills LinkedIn and Github).
        </DktText>
        <DktButton negative style={buttonStyle} onClick={mutation.mutate}>Agree and send</DktButton>
        <DktButton onClick={close}>Cancel</DktButton>
      </FlexLayout>
    </FlexLayout>
  );
}
