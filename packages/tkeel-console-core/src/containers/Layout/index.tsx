import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import { ThemeNames } from '@tkeel/console-themes';

// import CollapsedMenus from '@/tkeel-console-core/containers/Layout/CollapsedMenus';
import Header from '@/tkeel-console-core/containers/Layout/Header';
import Menus from '@/tkeel-console-core/containers/Layout/Menus';
import useMenusQuery from '@/tkeel-console-core/hooks/queries/useMenusQuery';
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

function Layout({ themeName }: Props) {
  const { menus } = useMenusQuery();
  const navigate = useNavigate();
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
            <Box
              width="100%"
              id={getElementIdByContainer(firstApp?.container)}
            />
          }
        />
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
    initQiankun({ menus, navigate, themeName });
  }, [menus, navigate, themeName]);

  return (
    <Flex height="100%">
      {/* <CollapsedMenus menus={menus} /> */}
      <Menus menus={menus} />
      <Flex flex="1" overflow="hidden" flexDirection="column" padding="24px">
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
