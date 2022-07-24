import React, { useState } from 'react';

import isBefore from 'date-fns/isBefore';
import { useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import * as auth from 'auth/auth-provider';
import { dikastisApi } from 'dikastis-api';
import { useToast } from 'toast/toast-context';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const { addToast } = useToast();
  const [{ expiration }, setAuthData] = useState(auth.getAuthData);
  const [user, setUser] = useState({});
  const queryClient = useQueryClient();
  const history = useHistory();

  const login = React.useCallback(
    () => {
      history.push('/api/oauth/login/google');
    },
    [],
  );
  const loginSucceeded = React.useCallback(
    () => {
      setTimeout(() => auth.login(setAuthData), 3000);
    },
    [setAuthData],
  );
  const register = React.useCallback(
    (form, doneFn) => {
      auth.register(form)
        .then(doneFn)
        .catch(({ response }) => addToast(response.status));
    },
    [setAuthData],
  );
  const logout = React.useCallback(() => {
    queryClient.clear();
    auth.logout();
    setAuthData({});
    // history.push('/api/logout');
  }, [setAuthData]);
  const fetchUser = React.useCallback(() => {
    dikastisApi.get('/people').then(({ data: person }) => {
      setUser(person);
    }).catch(({ response }) => {
      addToast(response.status);
    });
  }, [setUser]);
  const isLoggedIn = React.useCallback(() => {
    const now = new Date();
    if (!expiration) return false;
    const expirationDate = new Date(expiration);
    const valid = isBefore(now, expirationDate);
    return valid;
  }, [expiration]);

  // useEffect(() => {
  //   if (username != null) {
  //     dikastisApi.get('/people')
  //       .then(({ data: person }) => {
  //         setUser(person);
  //       }).catch(({ response: { status } }) => {
  //         if (status === 401) {
  //           return;
  //         }
  //         addToast(status);
  //       });
  //   }
  // }, [username, setUser]);

  const value = React.useMemo(
    () => ({
      fetchUser, isLoggedIn, login, loginSucceeded, logout, register, user,
    }),
    [fetchUser, isLoggedIn, login, loginSucceeded, logout, register, user],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
