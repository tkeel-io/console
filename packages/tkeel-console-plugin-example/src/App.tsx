import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Layout from '@/containers/Layout';
import routes from '@/routes';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const element = useRoutes(routes);

  return (
    <ChakraProvider>
      <Layout>
        <Router>{element}</Router>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
