import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { PlatformNames } from '@tkeel/console-constants';
import { QueryClient } from '@tkeel/console-hooks';
import themes, { DEFAULT_THEME_NAME } from '@tkeel/console-themes';

import Provider from '@/tkeel-console-portal-base/containers/Provider';
import Routes from '@/tkeel-console-portal-base/routes';

const queryClient = new QueryClient();

const themeName = DEFAULT_THEME_NAME;

const platformName =
  (process.env.PLATFORM_NAME as PlatformNames) || PlatformNames.TENANT;

function App() {
  return (
    <Provider globalProps={{ platformName }}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={themes[themeName]}>
          <Router>
            <Routes themeName={themeName} />
          </Router>
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
