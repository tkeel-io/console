// import { useEffect } from 'react';
import { Box, Flex, Skeleton } from '@chakra-ui/react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import Header from '@/tkeel-console-portal-base/containers/Layout/Header';
import Menus from '@/tkeel-console-portal-base/containers/Layout/Menus';
import useMenusQuery from '@/tkeel-console-portal-base/hooks/queries/useMenusQuery';
import useGlobalProps from '@/tkeel-console-portal-base/hooks/useGlobalProps';
import useQiankunInit from '@/tkeel-console-portal-base/hooks/useQiankunInit';
import NotFound from '@/tkeel-console-portal-base/pages/NotFound';
import {
  // init as initQiankun,
  menusToApps,
} from '@/tkeel-console-portal-base/utils';

function getElementIdByContainer(container: string): string {
  return container.replace(/^#/, '');
}

export default function Layout() {
  const { platformName, themeName } = useGlobalProps();
  const { menus, refetch } = useMenusQuery();

  const navigate = useNavigate();

  const initArgs = {
    platformName,
    menus,
    navigate,
    themeName,
    refetchMenus: () => {
      refetch();
    },
  };
  const apps = menusToApps(initArgs);

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

  const { isLoading } = useQiankunInit(initArgs);

  return (
    <Flex height="100%">
      <Menus />
      <Flex flex="1" overflow="hidden" flexDirection="column" padding="20px">
        <Header menus={menus} />
        <Flex position="relative" flex="1" overflow="hidden">
          {/* {isLoading && (
            <Spinner
              position="absolute"
              top="50%"
              right="50%"
              transform="translate(-50%, -50%)"
            />
          )} */}
          {isLoading && (
            <Skeleton
              position="absolute"
              top="0"
              right="0"
              bottom="0"
              left="0"
              width="100%"
              height="100%"
            />
          )}
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
