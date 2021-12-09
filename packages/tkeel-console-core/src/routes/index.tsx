import React from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import Layout from '@/containers/Layout';
import Login from '@/pages/Login';
import PageNotFound from '@/pages/PageNotFound';
import { menusToApps } from '@/utils/qiankun';

import { IMenu } from '@/mock/types';

type Props = {
  menus: IMenu[];
};

function Routes({ menus }: Props) {
  const apps = menusToApps({ menus });

  const renderApps = () => {
    if (!(Array.isArray(apps) && apps.length > 0)) {
      return null;
    }

    return (
      <>
        <Route
          index
          element={<div id={apps[0].container.replace(/^#/, '')} />}
        />
        {apps.map(({ name, container, activeRule }) => {
          return (
            <Route
              key={name}
              path={`${activeRule}/*`}
              element={<div id={container.replace(/^#/, '')} />}
            />
          );
        })}
      </>
    );
  };

  return (
    <ReactRouterRoutes>
      <Route path="/auth">
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="/" element={<Layout menus={menus} />}>
        {renderApps()}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </ReactRouterRoutes>
  );
}

export default Routes;
