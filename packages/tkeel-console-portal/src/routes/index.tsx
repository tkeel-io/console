import React from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import { ThemeNames } from '@tkeel/console-themes';

import Layout from '@/tkeel-console-portal/containers/Layout';
import NotRequireAuth from '@/tkeel-console-portal/containers/NotRequireAuth';
import RequireAuth from '@/tkeel-console-portal/containers/RequireAuth';
import Login from '@/tkeel-console-portal/pages/Login';

type Props = {
  themeName: ThemeNames;
};

function Routes({ themeName }: Props) {
  return (
    <ReactRouterRoutes>
      <Route element={<NotRequireAuth />}>
        <Route path="/auth">
          <Route path="login" element={<Login />} />
        </Route>
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="/*" element={<Layout themeName={themeName} />} />
      </Route>
    </ReactRouterRoutes>
  );
}

export default Routes;
