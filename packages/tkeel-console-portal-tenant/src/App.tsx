import { QueryClientProvider } from 'react-query';

import { QueryClient } from '@tkeel/console-hooks';
import BaseApp from '@tkeel/console-portal-base';

import LogoMark from './components/LogoMark';
import LogoTypeDark from './components/LogoTypeDark';
import LogoTypeLight from './components/LogoTypeLight';
import UserActionMenus from './components/UserActionMenus';
import NotRequireAuth from './containers/NotRequireAuth';
import RequireAuth from './containers/RequireAuth';
import useDocumentHead from './hooks/useDocumentHead';
import notRequireAuthRoutes from './routes/notRequireAuthRoutes';

const queryClient = new QueryClient();

export default function App() {
  useDocumentHead();

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
