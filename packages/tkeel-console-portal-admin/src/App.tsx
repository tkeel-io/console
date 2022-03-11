import BaseApp from '@tkeel/console-portal-base';

import DocumentHead from './components/DocumentHead';
import LogoMark from './components/LogoMark';
import LogoTypeDark from './components/LogoTypeDark';
import LogoTypeLight from './components/LogoTypeLight';
import UserActionMenus from './components/UserActionMenus';
import AntiRequireAuth from './containers/AntiRequireAuth';
import RequireAuth from './containers/RequireAuth';
import antiRequireAuthRoutes from './routes/antiRequireAuthRoutes';

export default function App() {
  return (
    <BaseApp
      documentHeadComponent={<DocumentHead />}
      requireAuthContainer={<RequireAuth />}
      antiRequireAuthContainer={<AntiRequireAuth />}
      antiRequireAuthRoutes={antiRequireAuthRoutes}
      userActionMenusComponent={<UserActionMenus />}
      logo={{
        mark: <LogoMark />,
        typeLight: <LogoTypeLight />,
        typeDark: <LogoTypeDark />,
      }}
    />
  );
}
