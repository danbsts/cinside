import React from 'react';

import { css } from '@emotion/css';

import { useToast } from 'toast/toast-context';

import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';
import closeIcon from 'assets/close-icon.svg';
import toastProperties from 'toast/toast-properties';

const containerStyle = css`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 500;
`;
const toastStyle = css`
  margin-top: 20px;
  padding: 28px 12px;
  min-width: 500px;
  box-sizing: border-box;
  background-color: #FFF;
  box-shadow: 0px 4px 14px 2px rgba(0, 0, 0, 0.16);
  border-radius: 15px 0px 0px 15px;
  animation: slide-in-out 4s forwards;
  @keyframes slide-in-out {
    0% { transform: translateX(100%); }
    10% { transform: translateX(0%); }
    90% { transform: translateX(0%); }
    100% { transform: translateX(100%); }
  }
`;
const subtitleStyle = css`
  color: #EEBF4D;
`;
const closeStyle = css`
  cursor: pointer;
`;

const Toast = ({ id, message, type }) => {
  const { description, icon, title } = toastProperties[type];
  const { removeToast } = useToast();

  return (
    <FlexLayout alignItems="flex-start" style={toastStyle}>
      <img alt="close" className={closeStyle} role="presentation" src={closeIcon} width="40px" onClick={() => removeToast(id)} />
      <FlexLayout alignItems="center" justifyContent="space-between">
        <div>
          <DktText holder="h2">{title}</DktText>
          <DktText holder="h3" style={subtitleStyle}>{message || description}</DktText>
        </div>
        {icon}
      </FlexLayout>
    </FlexLayout>
  );
};

export default function ToastContainer({ messages }) {
  return (
    <div className={containerStyle}>
      {messages.map(({ id, message, type }) => (
        <Toast key={id} id={id} message={message} type={type} />
      ))}
    </div>
  );
}
