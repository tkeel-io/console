import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { PortalProvider } from '@tkeel/console-business-components';
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
  requireAuthContainer: ReactNode;
  notRequireAuthContainer: ReactNode;
  notRequireAuthRoutes: ReactNode;
  userActionMenusComponent: ReactNode;
  logo: Logo;
};

export default function App({
  requireAuthContainer,
  notRequireAuthContainer,
  notRequireAuthRoutes,
  userActionMenusComponent,
  logo,
}: Props) {
  return (
    <PortalProvider globalProps={{ themeName }}>
      <ChakraProvider theme={theme}>
        <Router>
          <Routes
            requireAuthContainer={requireAuthContainer}
            notRequireAuthContainer={notRequireAuthContainer}
            notRequireAuthRoutes={notRequireAuthRoutes}
            userActionMenusComponent={userActionMenusComponent}
            logo={logo}
          />
        </Router>
      </ChakraProvider>
    </PortalProvider>
  );
}
