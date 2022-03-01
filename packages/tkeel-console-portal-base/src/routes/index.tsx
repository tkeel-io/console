import { ReactNode } from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import Layout from '@/tkeel-console-portal-base/containers/Layout';

type Props = {
  requireAuthContainer: ReactNode;
  notRequireAuthContainer: ReactNode;
  notRequireAuthRoutes: ReactNode;
  userActionMenusComponent: ReactNode;
};

export default function Routes({
  requireAuthContainer,
  notRequireAuthContainer,
  notRequireAuthRoutes,
  userActionMenusComponent,
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
            <Layout userActionMenusComponent={userActionMenusComponent} />
          }
        />
      </Route>
    </ReactRouterRoutes>
  );
}
