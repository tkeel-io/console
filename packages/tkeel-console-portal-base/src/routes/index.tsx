import { ReactNode } from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

// import { PLATFORM_INFOS, PlatformNames } from '@tkeel/console-constants';
import Layout from '@/tkeel-console-portal-base/containers/Layout';
// import NotRequireAuth from '@/tkeel-console-portal-base/containers/NotRequireAuth';
// import RequireAuth from '@/tkeel-console-portal-base/containers/RequireAuth';
// import LoginAdmin from '@/tkeel-console-portal-base/pages/LoginAdmin';
// import LoginTenant from '@/tkeel-console-portal-base/pages/LoginTenant';
// import NotFound from '@/tkeel-console-portal-base/pages/NotFound';
// import SetPassword from '@/tkeel-console-portal-base/pages/SetPassword';
// import Tenant from '@/tkeel-console-portal-base/pages/Tenant';

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
  /* return (
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
  ); */
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
