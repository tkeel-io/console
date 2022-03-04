import { Box, Center, Flex, Image, Skeleton } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import {
  NotFound,
  useGlobalPortalProps,
} from '@tkeel/console-business-components';
import { Logo } from '@tkeel/console-types';
import { isEnvDevelopment } from '@tkeel/console-utils';

import noPlugins from '@/tkeel-console-portal-base/assets/images/no-plugins.svg';
import Header from '@/tkeel-console-portal-base/containers/Layout/Header';
import Menus from '@/tkeel-console-portal-base/containers/Layout/Menus';
import useMenusQuery from '@/tkeel-console-portal-base/hooks/queries/useMenusQuery';
import useQiankunInit from '@/tkeel-console-portal-base/hooks/useQiankunInit';
import { menusToApps } from '@/tkeel-console-portal-base/utils';

function getElementIdByContainer(container: string): string {
  return container.replace(/^#/, '');
}

type Props = {
  userActionMenusComponent: ReactNode;
  logo: Logo;
};

export default function Layout({ userActionMenusComponent, logo }: Props) {
  const { themeName } = useGlobalPortalProps();
  const { menus, isLoading: isLoadingMenus, refetch } = useMenusQuery();

  const navigate = useNavigate();

  const initArgs = {
    menus,
    navigate,
    themeName,
    refetchMenus: () => {
      refetch();
    },
  };
  const apps = menusToApps(initArgs);

  const renderApps = () => {
    const [firstApp] = apps;

    return (
      <>
        {!isEnvDevelopment() && (
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
    <Flex height="100%" overflowX="auto">
      <Menus logo={logo} />
      <Flex
        flex="1"
        overflow="hidden"
        minWidth="1200px"
        flexDirection="column"
        padding="20px"
      >
        <Header
          menus={menus}
          userActionMenusComponent={userActionMenusComponent}
        />
        <Flex position="relative" flex="1" overflow="hidden">
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
          {isLoadingMenus ? null : apps.length > 0 ? (
            <Routes>
              {renderApps()}
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <Center width="100%">
              <Image src={noPlugins} width="325px" />
            </Center>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
