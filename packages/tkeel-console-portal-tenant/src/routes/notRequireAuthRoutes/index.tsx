import { Route } from 'react-router-dom';

import { NotFound } from '@tkeel/console-business-components';

import Login from '@/tkeel-console-portal-tenant/pages/Login';
import SetPassword from '@/tkeel-console-portal-tenant/pages/SetPassword';
import Tenant from '@/tkeel-console-portal-tenant/pages/Tenant';

export default (
  <>
    <Route path="tenant" element={<Tenant />} />
    <Route path="login" element={<Login />}>
      <Route path=":tenantId" />
    </Route>
    <Route path="set-password" element={<SetPassword />} />
    <Route path="*" element={<NotFound />} />
  </>
);
