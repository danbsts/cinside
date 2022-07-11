import React, {
  useCallback, useContext, useState,
} from 'react';

import { UlidMonotonic } from 'id128';

import ToastContainer from 'toast/ToastContainer';

const ToastContext = React.createContext();

const ToastProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const removeToast = useCallback((id) => {
    setMessages((oldMessages) => oldMessages.filter((message) => message.id !== id));
  }, []);
  const addToast = useCallback(
    (type, message) => {
      const id = UlidMonotonic.generate().toRaw();
      const toast = {
        id,
        message,
        type,
      };
      setMessages((oldMessages) => [toast, ...oldMessages]);
      setTimeout(() => removeToast(id), 4000);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export { ToastProvider, useToast };
