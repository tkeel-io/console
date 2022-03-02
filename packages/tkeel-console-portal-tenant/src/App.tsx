import BaseApp from '@tkeel/console-portal-base';

import LogoMark from './components/LogoMark';
import LogoTypeDark from './components/LogoTypeDark';
import LogoTypeLight from './components/LogoTypeLight';
import UserActionMenus from './components/UserActionMenus';
import NotRequireAuth from './containers/NotRequireAuth';
import RequireAuth from './containers/RequireAuth';
import notRequireAuthRoutes from './routes/notRequireAuthRoutes';

export default function App() {
  return (
    <BaseApp
      requireAuthContainer={<RequireAuth />}
      notRequireAuthContainer={<NotRequireAuth />}
      notRequireAuthRoutes={notRequireAuthRoutes}
      userActionMenusComponent={<UserActionMenus />}
      logo={{
        mark: <LogoMark />,
        typeLight: <LogoTypeLight />,
        typeDark: <LogoTypeDark />,
      }}
    />
  );
}
