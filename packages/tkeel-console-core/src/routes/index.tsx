import React, { useEffect } from 'react';
import {
  Route,
  Routes as ReactRouterRoutes,
  useNavigate,
} from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { ThemeNames } from '@tkeel/console-themes';

import Layout from '@/tkeel-console-core/containers/Layout';
import useMenusQuery from '@/tkeel-console-core/hooks/queries/useMenusQuery';
import Login from '@/tkeel-console-core/pages/Login';
import NotFound from '@/tkeel-console-core/pages/NotFound';
import {
  init as initQiankun,
  menusToApps,
} from '@/tkeel-console-core/utils/qiankun';

function getElementIdByContainer(container: string): string {
  return container.replace(/^#/, '');
}

type Props = {
  themeName: ThemeNames;
};

function Routes({ themeName }: Props) {
  const navigate = useNavigate();
  const { menus } = useMenusQuery();
  const apps = menusToApps({ menus, navigate, themeName });

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
    initQiankun({ menus, navigate, themeName });
  }, [menus, navigate, themeName]);

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
