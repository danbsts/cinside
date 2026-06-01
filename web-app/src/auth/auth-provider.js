import addSeconds from 'date-fns/addSeconds';

import { dikastisApi } from 'dikastis-api';

const localStorageTokenExpirationKey = '@CInside:token-expiration';
const localStorageTokenKey = '@CInside:access-token';

function getAuthData() {
  return {
    expiration: window.localStorage.getItem(localStorageTokenExpirationKey),
    token: window.localStorage.getItem(localStorageTokenKey),
  };
}

function saveAuthData({ expiration, token }) {
  window.localStorage.setItem(localStorageTokenExpirationKey, expiration);
  if (token) {
    window.localStorage.setItem(localStorageTokenKey, token);
  }
}

function login(setAuthData) {
  const expirationDate = addSeconds(new Date(), 60 * 60 * 24);
  const authData = {
    expiration: expirationDate.toISOString(),
  };
  saveAuthData(authData);
  setAuthData(authData);
}

async function loginWithCredentials(email, password) {
  const response = await dikastisApi.post('/login', {
    password,
    username: email,
  });
  const { access_token: accessToken, expires_in: expiresIn } = response.data;
  const expirationDate = addSeconds(new Date(), expiresIn || 3600);
  const authData = {
    expiration: expirationDate.toISOString(),
    token: accessToken,
  };
  saveAuthData(authData);
  return { authData, response: response.data };
}

function register(form) {
  return dikastisApi.post('/people', form);
}

function logout() {
  window.localStorage.removeItem(localStorageTokenExpirationKey);
  window.localStorage.removeItem(localStorageTokenKey);
}

export {
  getAuthData,
  login,
  loginWithCredentials,
  logout,
  register,
};
