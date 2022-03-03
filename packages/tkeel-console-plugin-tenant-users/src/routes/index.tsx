import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import { NotFound } from '@tkeel/console-business-components';

import Users from '@/tkeel-console-plugin-tenant-users/pages/Users';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Users />} />
      <Route path="*" element={<NotFound />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
