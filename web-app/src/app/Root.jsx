import React, { Suspense, useEffect } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from 'react-query';

import { AuthProvider, useAuth } from 'auth/auth-context';
import { Path } from 'router/routing';
import { ToastProvider } from 'toast/toast-context';
import { queryClient } from 'dikastis-api';

import { removeDupedForwardSlashes, removeTrailingForwardSlash } from 'router/ReactRouterFix';
import AuthenticatedApp from 'app/AuthenticatedApp';
import DktLoader from 'shared/DktLoader';
import DktRouter from 'router/DktRouter';
import LogoutSucceeded from 'auth/LogoutSucceeded';
import StackErrorPage from 'shared/error/StackErrorPage';
import UnauthenticatedApp from 'app/UnathenticatedApp';

function App() {
  const { hasToken, isLoggedIn, logout } = useAuth();
  const loggedIn = isLoggedIn();

  useEffect(() => {
    if (!loggedIn && hasToken()) logout();
  }, [loggedIn]);

  return loggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

function Root() {
  return (
    <DktRouter>
      {removeDupedForwardSlashes()}
      {removeTrailingForwardSlash()}
      <Route component={LogoutSucceeded} path={Path.LOGOUT_SUCCEEDED} />
      <App />
    </DktRouter>
  );
}

function withGlobalWrappers(Component) {
  return () => (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter forceRefresh>
          <AuthProvider>
            <ErrorBoundary fallbackRender={StackErrorPage}>
              <Suspense fallback={<DktLoader />}>
                <Component />
              </Suspense>
            </ErrorBoundary>
          </AuthProvider>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default withGlobalWrappers(Root);
