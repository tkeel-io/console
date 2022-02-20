import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import Index from '../pages/Index';
import Tenant from '../pages/Tenant';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/:id" element={<Tenant />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
