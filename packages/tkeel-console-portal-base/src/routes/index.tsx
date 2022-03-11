import { ReactNode } from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import { Logo } from '@tkeel/console-types';

import Layout from '@/tkeel-console-portal-base/containers/Layout';

type Props = {
  requireAuthContainer: ReactNode;
  requireNoAuthContainer: ReactNode;
  requireNoAuthRoutes: ReactNode;
  notRequireAuthRoutes?: ReactNode;
  userActionMenusComponent: ReactNode;
  logo: Logo;
};

export default function Routes({
  requireAuthContainer,
  requireNoAuthContainer,
  requireNoAuthRoutes,
  notRequireAuthRoutes,
  userActionMenusComponent,
  logo,
}: Props) {
  return (
    <ReactRouterRoutes>
      {notRequireAuthRoutes}
      <Route element={requireNoAuthContainer}>{requireNoAuthRoutes}</Route>
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
