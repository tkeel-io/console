import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { PlatformNames } from '@tkeel/console-constants';
import { QueryClient } from '@tkeel/console-hooks';
import themes, {
  DEFAULT_THEME,
  DEFAULT_THEME_NAME,
  ThemeNames,
} from '@tkeel/console-themes';

import Provider from '@/tkeel-console-portal-base/containers/Provider';
import Routes from '@/tkeel-console-portal-base/routes';

const queryClient = new QueryClient();

const themeName =
  (GLOBAL_CONFIG.client.themeName as ThemeNames) || DEFAULT_THEME_NAME;
const theme = themes[themeName] || DEFAULT_THEME;

const platformName =
  (GLOBAL_CONFIG.platformName as PlatformNames) || PlatformNames.TENANT;

function App() {
  return (
    <Provider globalProps={{ platformName, themeName }}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Router>
            <Routes />
          </Router>
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
