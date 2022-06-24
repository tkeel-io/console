import { Route } from 'react-router-dom';

import { NotFound } from '@tkeel/console-business-components';

import Login from '@/tkeel-console-portal-tenant/pages/Login';
import Tenant from '@/tkeel-console-portal-tenant/pages/Tenant';

export default (
  <Route path="/auth">
    <Route path="tenant" element={<Tenant />} />
    <Route path="login" element={<Login />}>
      <Route path=":tenantId" />
    </Route>
    <Route path="" element={<NotFound />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);
