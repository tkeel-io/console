/* eslint-disable no-underscore-dangle */

import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Layout from '@/containers/Layout';
import Routes from '@/containers/Routes';

function App() {
  return (
    <ChakraProvider>
      <Layout>
        <Router
          // @ts-ignore
          basename={window.__POWERED_BY_QIANKUN__ ? '/plugin-example' : '/'}
        >
          <Link to="/">Index</Link>
          <Link to="/page-a">PageA</Link>
          <Routes />
        </Router>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
