/* eslint-disable no-param-reassign */
import { QueryClient } from 'react-query';
import axios from 'axios';

import * as auth from 'auth/auth-provider';

const baseURL = `${window.location.protocol}//${window.location.hostname}/api`;

const dikastisApi = axios.create({
  baseURL,
});

dikastisApi.interceptors.request.use((config) => {
  const { token } = auth.getAuthData();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await dikastisApi.get(queryKey[0]);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      suspense: true,
    },
  },
});

export { dikastisApi, queryClient };
