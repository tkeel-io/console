import { ReactNode } from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import { Logo } from '@tkeel/console-types';

import Layout from '@/tkeel-console-portal-base/containers/Layout';

type Props = {
  requireAuthContainer: ReactNode;
  notRequireAuthContainer: ReactNode;
  notRequireAuthRoutes: ReactNode;
  userActionMenusComponent: ReactNode;
  logo: Logo;
};

export default function Routes({
  requireAuthContainer,
  notRequireAuthContainer,
  notRequireAuthRoutes,
  userActionMenusComponent,
  logo,
}: Props) {
  return (
    <ReactRouterRoutes>
      <Route element={notRequireAuthContainer}>
        <Route path="/auth">{notRequireAuthRoutes}</Route>
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
