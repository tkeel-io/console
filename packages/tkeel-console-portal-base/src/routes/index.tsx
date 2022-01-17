import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import { ThemeNames } from '@tkeel/console-themes';

import {
  PLATFORM_INFOS,
  PlatformNames,
} from '@/tkeel-console-portal-base/constants';
import Layout from '@/tkeel-console-portal-base/containers/Layout';
import NotRequireAuth from '@/tkeel-console-portal-base/containers/NotRequireAuth';
import RequireAuth from '@/tkeel-console-portal-base/containers/RequireAuth';
import LoginAdmin from '@/tkeel-console-portal-base/pages/LoginAdmin';
import LoginTenant from '@/tkeel-console-portal-base/pages/LoginTenant';
import NotFound from '@/tkeel-console-portal-base/pages/NotFound';

type Props = {
  themeName: ThemeNames;
};

const platformName =
  (process.env.PLATFORM_NAME as PlatformNames) || PlatformNames.TENANT;

function Routes({ themeName }: Props) {
  return (
    <ReactRouterRoutes>
      <Route element={<NotRequireAuth platformName={platformName} />}>
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
      <Route element={<RequireAuth platformName={platformName} />}>
        <Route path="/*" element={<Layout themeName={themeName} />} />
      </Route>
    </ReactRouterRoutes>
  );
}

export default Routes;
