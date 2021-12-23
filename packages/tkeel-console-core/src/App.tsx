/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import themes from '@tkeel/console-themes';

import { THEME } from '@/constants';
import Routes from '@/routes';
import { init as initQiankun } from '@/utils/qiankun';

import { fetchMenus } from '@/mock';
import { IMenu } from '@/mock/types';

const queryClient = new QueryClient();

function App() {
  const [menus, setMenus] = useState<IMenu[]>([]);

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
    initQiankun({ menus });
  }, [menus]);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={themes[THEME]}>
        <Router>
          <Routes menus={menus} />
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
