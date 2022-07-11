import addSeconds from 'date-fns/addSeconds';

import { dikastisApi } from 'dikastis-api';

const localStorageTokenExpirationKey = '@CInside:token-expiration';

function getAuthData() {
  return {
    expiration: window.localStorage.getItem(localStorageTokenExpirationKey),
  };
}

function saveAuthData({ expiration }) {
  window.localStorage.setItem(localStorageTokenExpirationKey, expiration);
}

function login(setAuthData) {
  const expirationDate = addSeconds(new Date(), 3000);
  const authData = {
    expiration: expirationDate.toISOString(),
  };
  saveAuthData(authData);
  setAuthData(authData);
}

function register(form) {
  return dikastisApi.post('/people', form);
}

function logout() {
  window.localStorage.removeItem(localStorageTokenExpirationKey);
}

export {
  getAuthData,
  login,
  logout,
  register,
};
