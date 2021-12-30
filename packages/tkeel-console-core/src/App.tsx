/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from 'react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient } from '@tkeel/console-hooks';
import themes, { DEFAULT_THEME_NAME } from '@tkeel/console-themes';

import Routes from '@/routes';
import { init as initQiankun } from '@/utils/qiankun';

import { fetchMenus } from '@/mock';
import { Menu } from '@/mock/types';

const queryClient = new QueryClient();

const themeName = DEFAULT_THEME_NAME;

function App() {
  const [menus, setMenus] = useState<Menu[]>([]);

  const fetchData = async () => {
    try {
      const data = await fetchMenus();
      setMenus(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const init = async () => {
    await fetchData();
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initQiankun({ menus, themeName });
  }, [menus]);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={themes[themeName]}>
        <Router>
          <Routes menus={menus} />
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
