import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';

import Header from '@/tkeel-console-portal-base/containers/Layout/Header';
import Menus from '@/tkeel-console-portal-base/containers/Layout/Menus';
import useMenusQuery from '@/tkeel-console-portal-base/hooks/queries/useMenusQuery';
import useGlobalProps from '@/tkeel-console-portal-base/hooks/useGlobalProps';
import NotFound from '@/tkeel-console-portal-base/pages/NotFound';
import {
  init as initQiankun,
  menusToApps,
} from '@/tkeel-console-portal-base/utils';

function getElementIdByContainer(container: string): string {
  return container.replace(/^#/, '');
}

function Layout() {
  const { platformName, themeName } = useGlobalProps();
  const { menus, refetch } = useMenusQuery();

  const navigate = useNavigate();
  const apps = menusToApps({
    platformName,
    menus,
    navigate,
    themeName,
    refetchMenus: () => {
      refetch();
    },
  });

  const renderApps = () => {
    if (!(Array.isArray(apps) && apps.length > 0)) {
      return null;
    }

    const [firstApp] = apps;

    return (
      <>
        {process.env.NODE_ENV !== 'development' && (
          <Route
            index
            element={<Navigate to={firstApp.activeRule} replace />}
          />
        )}
        {apps.map(({ name, container, activeRule }) => {
          return (
            <Route
              key={name}
              path={`${activeRule}/*`}
              element={
                <Box width="100%" id={getElementIdByContainer(container)} />
              }
            />
          );
        })}
      </>
    );
  };

  useEffect(() => {
    initQiankun({
      platformName,
      menus,
      navigate,
      themeName,
      refetchMenus: () => {
        refetch();
      },
    });
  }, [platformName, menus, navigate, themeName, refetch]);

  return (
    <Flex height="100%">
      <Menus />
      <Flex flex="1" overflow="hidden" flexDirection="column" padding="20px">
        <Header menus={menus} />
        <Flex flex="1" overflow="hidden">
          <Routes>
            {renderApps()}
            {Array.isArray(apps) && apps.length > 0 && (
              <Route path="*" element={<NotFound />} />
            )}
          </Routes>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Layout;
