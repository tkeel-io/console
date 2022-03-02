import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

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

type Props = {
  requireAuthContainer: ReactNode;
  notRequireAuthContainer: ReactNode;
  notRequireAuthRoutes: ReactNode;
  userActionMenusComponent: ReactNode;
};

export default function App({
  requireAuthContainer,
  notRequireAuthContainer,
  notRequireAuthRoutes,
  userActionMenusComponent,
}: Props) {
  return (
    <Provider globalProps={{ themeName }}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Router>
            <Routes
              requireAuthContainer={requireAuthContainer}
              notRequireAuthContainer={notRequireAuthContainer}
              notRequireAuthRoutes={notRequireAuthRoutes}
              userActionMenusComponent={userActionMenusComponent}
            />
          </Router>
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  );
}
