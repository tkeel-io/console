import React from 'react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient } from '@tkeel/console-hooks';
import themes, { DEFAULT_THEME_NAME } from '@tkeel/console-themes';

import Routes from '@/tkeel-console-portal-base/routes';

const queryClient = new QueryClient();

const themeName = DEFAULT_THEME_NAME;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={themes[themeName]}>
        <Router>
          <Routes themeName={themeName} />
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
