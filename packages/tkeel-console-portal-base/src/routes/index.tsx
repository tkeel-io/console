import { ReactNode } from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import { Logo } from '@tkeel/console-types';

import Layout from '@/tkeel-console-portal-base/containers/Layout';

type Props = {
  requireAuthContainer: ReactNode;
  antiRequireAuthContainer: ReactNode;
  antiRequireAuthRoutes: ReactNode;
  userActionMenusComponent: ReactNode;
  logo: Logo;
};

export default function Routes({
  requireAuthContainer,
  antiRequireAuthContainer,
  antiRequireAuthRoutes,
  userActionMenusComponent,
  logo,
}: Props) {
  return (
    <ReactRouterRoutes>
      <Route element={antiRequireAuthContainer}>
        <Route path="/auth">{antiRequireAuthRoutes}</Route>
      </Route>
      <Route element={requireAuthContainer}>
        <Route
          path="/*"
          element={
            <Layout
              userActionMenusComponent={userActionMenusComponent}
              logo={logo}
            />
          }
        />
      </Route>
    </ReactRouterRoutes>
  );
}
