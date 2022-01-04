/* eslint-disable no-underscore-dangle */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { PluginProvider } from '@tkeel/console-business-components';
import { PluginGlobalProps } from '@tkeel/console-types';

import Routes from '@/tkeel-console-plugin-example/routes';

function App(props: PluginGlobalProps) {
  const { theme } = props;

  return (
    <PluginProvider globalProps={props}>
      <ChakraProvider theme={theme}>
        <Router
          // @ts-ignore
          basename={window.__POWERED_BY_QIANKUN__ ? process.env.BASE_PATH : '/'}
        >
          <Routes />
        </Router>
      </ChakraProvider>
    </PluginProvider>
  );
}

export default App;
