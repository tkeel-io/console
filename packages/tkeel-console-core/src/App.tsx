import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import { Button, ChakraProvider } from '@chakra-ui/react';
import { initGlobalState, MicroAppStateActions } from 'qiankun';

import Menus from '@/components/Menus';
// import Routes from '@/routes';
import { init as initQiankun } from '@/utils/qiankun';

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
      {/* <Router> */}
      <Button
        onClick={() => {
          actions.setGlobalState({ app: 'main-app' });
        }}
      >
        main-app setGlobalState
      </Button>
      <Menus data={menus} />
      <div id="sub-app" />
      {/* <Routes data={menus} /> */}
      {/* </Router> */}
    </ChakraProvider>
  );
}

export default App;
