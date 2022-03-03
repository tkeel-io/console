import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import { NotFound } from '@tkeel/console-business-components';

import Roles from '../pages/Roles';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Roles />} />
      <Route path="*" element={<NotFound />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
