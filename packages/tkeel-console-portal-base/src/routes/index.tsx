import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import { ThemeNames } from '@tkeel/console-themes';

import { PLATFORMS } from '@/tkeel-console-portal-base/constants';
import Layout from '@/tkeel-console-portal-base/containers/Layout';
import NotRequireAuth from '@/tkeel-console-portal-base/containers/NotRequireAuth';
import RequireAuth from '@/tkeel-console-portal-base/containers/RequireAuth';
import LoginAdmin from '@/tkeel-console-portal-base/pages/LoginAdmin';
import LoginTenant from '@/tkeel-console-portal-base/pages/LoginTenant';

type Props = {
  themeName: ThemeNames;
};

const platform = process.env.PLATFORM;

function Routes({ themeName }: Props) {
  return (
    <ReactRouterRoutes>
      <Route element={<NotRequireAuth />}>
        <Route path="/auth">
          {platform === PLATFORMS.admin && (
            <Route path="login" element={<LoginAdmin />} />
          )}
          {platform === PLATFORMS.tenant && (
            <Route path="login" element={<LoginTenant />} />
          )}
        </Route>
      </Route>
      {/* TODO: 临时 */}
      {platform === PLATFORMS.admin && (
        <Route path="/*" element={<Layout themeName={themeName} />} />
      )}
      {platform === PLATFORMS.tenant && (
        <Route element={<RequireAuth />}>
          <Route path="/*" element={<Layout themeName={themeName} />} />
        </Route>
      )}
    </ReactRouterRoutes>
  );
}

export default Routes;
