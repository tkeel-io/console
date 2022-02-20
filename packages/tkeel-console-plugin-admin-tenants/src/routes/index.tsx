import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import Index from '../pages/Index';
import Tenant from '../pages/Tenant';

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/:id" element={<Tenant />} />
    </ReactRouterRoutes>
  );
}
