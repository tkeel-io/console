import BaseApp from '@tkeel/console-portal-base';

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
    />
  );
}
