/* eslint-disable no-underscore-dangle */

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Routes from '@/containers/Routes';

function App() {
  return (
    <ChakraProvider>
      <Router
        // @ts-ignore
        basename={window.__POWERED_BY_QIANKUN__ ? '/plugin-example' : '/'}
      >
        <Routes />
      </Router>
    </ChakraProvider>
  );
}

export default App;
