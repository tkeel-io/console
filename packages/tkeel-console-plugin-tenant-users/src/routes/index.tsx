import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import Users from '@/tkeel-console-plugin-tenant-users/pages/Users';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Users />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
