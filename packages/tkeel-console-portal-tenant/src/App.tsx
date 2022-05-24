import BaseApp from '@tkeel/console-portal-base';

import DocumentHead from './components/DocumentHead';
import UserActionMenus from './components/UserActionMenus';
import RequireAuth from './containers/RequireAuth';
import RequireNoAuth from './containers/RequireNoAuth';
import notRequireAuthRoutes from './routes/notRequireAuthRoutes';
import requireNoAuthRoutes from './routes/requireNoAuthRoutes';

export default function App() {
  return (
    <BaseApp
      documentHeadComponent={<DocumentHead />}
      requireAuthContainer={<RequireAuth />}
      requireNoAuthContainer={<RequireNoAuth />}
      requireNoAuthRoutes={requireNoAuthRoutes}
      notRequireAuthRoutes={notRequireAuthRoutes}
      userActionMenusComponent={<UserActionMenus />}
    />
  );
}
