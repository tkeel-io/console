import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { PortalProvider } from '@tkeel/console-business-components';
import { QueryClient } from '@tkeel/console-hooks';
import themes, {
  DEFAULT_THEME,
  DEFAULT_THEME_NAME,
  ThemeNames,
} from '@tkeel/console-themes';
import { Logo } from '@tkeel/console-types';

import Routes from '@/tkeel-console-portal-base/routes';

const themeName =
  (PORTAL_GLOBALS.client.themeName as ThemeNames) || DEFAULT_THEME_NAME;
const theme = themes[themeName] || DEFAULT_THEME;

type Props = {
  documentHeadComponent: ReactNode;
  requireAuthContainer: ReactNode;
  notRequireAuthContainer: ReactNode;
  notRequireAuthRoutes: ReactNode;
  userActionMenusComponent: ReactNode;
  logo: Logo;
};

const queryClient = new QueryClient();

export default function App({
  documentHeadComponent,
  requireAuthContainer,
  notRequireAuthContainer,
  notRequireAuthRoutes,
  userActionMenusComponent,
  logo,
}: Props) {
  return (
    <PortalProvider globalProps={{ themeName }}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ChakraProvider theme={theme}>
            {documentHeadComponent}
            <Routes
              requireAuthContainer={requireAuthContainer}
              notRequireAuthContainer={notRequireAuthContainer}
              notRequireAuthRoutes={notRequireAuthRoutes}
              userActionMenusComponent={userActionMenusComponent}
              logo={logo}
            />
          </ChakraProvider>
        </Router>
      </QueryClientProvider>
    </PortalProvider>
  );
}
