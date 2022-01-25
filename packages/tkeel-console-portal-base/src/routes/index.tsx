import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import { PLATFORM_INFOS, PlatformNames } from '@tkeel/console-constants';

import Layout from '@/tkeel-console-portal-base/containers/Layout';
import NotRequireAuth from '@/tkeel-console-portal-base/containers/NotRequireAuth';
import RequireAuth from '@/tkeel-console-portal-base/containers/RequireAuth';
import useGlobalProps from '@/tkeel-console-portal-base/hooks/useGlobalProps';
import LoginAdmin from '@/tkeel-console-portal-base/pages/LoginAdmin';
import LoginTenant from '@/tkeel-console-portal-base/pages/LoginTenant';
import NotFound from '@/tkeel-console-portal-base/pages/NotFound';

function Routes() {
  const { platformName } = useGlobalProps();

  return (
    <ReactRouterRoutes>
      <Route element={<NotRequireAuth />}>
        <Route path="/auth">
          {platformName === PLATFORM_INFOS[PlatformNames.ADMIN].name && (
            <>
              <Route path="login" element={<LoginAdmin />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
          {platformName === PLATFORM_INFOS[PlatformNames.TENANT].name && (
            <>
              <Route path="login/:tenantId" element={<LoginTenant />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Route>
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="/*" element={<Layout />} />
      </Route>
    </ReactRouterRoutes>
  );
}

export default Routes;
