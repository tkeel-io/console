import { ReactNode } from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import { Logo } from '@tkeel/console-types';

import Layout from '@/tkeel-console-portal-base/containers/Layout';

type Props = {
  requireAuthContainer: ReactNode;
  requireNoAuthContainer: ReactNode;
  requireNoAuthRoutes: ReactNode;
  userActionMenusComponent: ReactNode;
  logo: Logo;
};

export default function Routes({
  requireAuthContainer,
  requireNoAuthContainer,
  requireNoAuthRoutes,
  userActionMenusComponent,
  logo,
}: Props) {
  return (
    <ReactRouterRoutes>
      <Route element={requireNoAuthContainer}>
        <Route path="/auth">{requireNoAuthRoutes}</Route>
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
