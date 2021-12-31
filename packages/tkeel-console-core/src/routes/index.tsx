import React, { useEffect } from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { ThemeNames } from '@tkeel/console-themes';

import Layout from '@/core/containers/Layout';
import useMenusQuery from '@/core/hooks/queries/useMenusQuery';
import Login from '@/core/pages/Login';
import NotFound from '@/core/pages/NotFound';
import { init as initQiankun, menusToApps } from '@/core/utils/qiankun';

function getElementIdByContainer(container: string): string {
  return container.replace(/^#/, '');
}

type Props = {
  themeName: ThemeNames;
};

function Routes({ themeName }: Props) {
  const { menus } = useMenusQuery();
  const apps = menusToApps({ menus });

  const renderApps = () => {
    if (!(Array.isArray(apps) && apps.length > 0)) {
      return null;
    }

    const [firstApp] = apps;

    return (
      <>
        <Route
          index
          element={
            <Box w="100%" id={getElementIdByContainer(firstApp?.container)} />
          }
        />
        {apps.map(({ name, container, activeRule }) => {
          return (
            <Route
              key={name}
              path={`${activeRule}/*`}
              element={<Box w="100%" id={getElementIdByContainer(container)} />}
            />
          );
        })}
      </>
    );
  };

  useEffect(() => {
    initQiankun({ menus, themeName });
  }, [menus, themeName]);

  return (
    <ReactRouterRoutes>
      <Route path="/auth">
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="/" element={<Layout menus={menus} />}>
        {renderApps()}
        {Array.isArray(apps) && apps.length > 0 && (
          <Route path="*" element={<NotFound />} />
        )}
      </Route>
    </ReactRouterRoutes>
  );
}

export default Routes;
