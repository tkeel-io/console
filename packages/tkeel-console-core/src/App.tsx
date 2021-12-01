/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { useRequest } from '@tkeel/console-hooks';
import { initGlobalState, MicroAppStateActions } from 'qiankun';

import Layout from '@/containers/Layout';
import Routes from '@/routes';
import { init as initQiankun, menusToApps } from '@/utils/qiankun';

import { fetchMenus } from '@/mock';
import { IMenu } from '@/mock/types';

function App() {
  const [menus, setMenus] = useState<IMenu[]>([]);

  const actions: MicroAppStateActions = initGlobalState({ app: '' });

  const fetchData = async () => {
    try {
      const data = await fetchMenus();
      setMenus(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const r = useRequest({ url: 'https://api.github.com/repositories?q=react' });
  // eslint-disable-next-line no-console
  console.log(r);

  const init = async () => {
    await fetchData();
    actions.onGlobalStateChange((state, prev) => {
      // eslint-disable-next-line no-console
      console.log('main-app-onGlobalStateChange', state, prev);
    });
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initQiankun({ menus });
  }, [menus]);

  return (
    <ChakraProvider>
      <Router>
        <Layout menus={menus}>
          <Routes data={menusToApps({ menus })} />
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
