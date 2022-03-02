import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import { NotFound } from '@tkeel/console-business-components';

import Tenant from '../pages/Tenant';
import Tenants from '../pages/Tenants';

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Tenants />} />
      <Route path="/:tenantId" element={<Tenant />} />
      <Route path="*" element={<NotFound />} />
    </ReactRouterRoutes>
  );
}
