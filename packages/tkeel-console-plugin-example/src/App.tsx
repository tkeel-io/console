/* eslint-disable no-underscore-dangle */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { PluginProps } from '@tkeel/console-types';

import Routes from '@/tkeel-console-plugin-example/routes';

function App({ theme }: PluginProps) {
  return (
    <ChakraProvider theme={theme}>
      <Router
        // @ts-ignore
        basename={window.__POWERED_BY_QIANKUN__ ? process.env.BASE_PATH : '/'}
      >
        <Routes />
      </Router>
    </ChakraProvider>
  );
}

export default App;
