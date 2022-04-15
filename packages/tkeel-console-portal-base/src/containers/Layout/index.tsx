import { Box, Center, Flex, Image, Skeleton } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { NotFound } from '@tkeel/console-business-components';
import { useDocuments } from '@tkeel/console-hooks';
import { Logo } from '@tkeel/console-types';
import { env } from '@tkeel/console-utils';

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
  const navigate = useNavigate();
  const documents = useDocuments();

  const { menus, isLoading: isLoadingMenus, refetch } = useMenusQuery();

  const initOptions = {
    menus,
    documents,
    navigate,
    refetchMenus: () => {
      refetch();
    },
  };
  const apps = menusToApps(initOptions);

  const renderApps = () => {
    const [firstApp] = apps;

    return (
      <>
        {!env.isEnvDevelopment() && (
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

  const { isLoading } = useQiankunInit(initOptions);

  return (
    <Flex height="100%" overflowX="auto">
      <Menus logo={logo} menus={menus} />
      <Flex flex="1" overflow="hidden" minWidth="1200px" flexDirection="column">
        <Header
          menus={menus}
          userActionMenusComponent={userActionMenusComponent}
        />
        <Flex position="relative" flex="1" overflow="hidden">
          {isLoading && (
            <Skeleton
              position="absolute"
              top="0"
              right="20px"
              bottom="20px"
              left="20px"
              width="calc(100% - 40px)"
              height="calc(100% - 20px)"
            />
          )}
          {(() => {
            if (apps.length > 0) {
              return (
                <Routes>
                  {renderApps()}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              );
            }

            if (isLoadingMenus) {
              return null;
            }

            return (
              <Center width="100%">
                <Image src={noPlugins} width="325px" />
              </Center>
            );
          })()}
        </Flex>
      </Flex>
    </Flex>
  );
}
