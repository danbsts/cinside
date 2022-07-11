import React from 'react';

import { Redirect, Route } from 'react-router-dom';

export const removeDupedForwardSlashes = () => (
  <Route
    exact
    strict
    path="(.*//+.*)"
    render={({ location }) => (
      <Redirect to={location.pathname.replace(/\/\/+/g, '/')} />
    )}
  />
);

export const removeTrailingForwardSlash = () => (
  <Route
    exact
    strict
    path="/:url*(/+)"
    render={({ location }) => (
      <Redirect to={location.pathname.replace(/\/+$/, location.search)} />
    )}
  />
);
