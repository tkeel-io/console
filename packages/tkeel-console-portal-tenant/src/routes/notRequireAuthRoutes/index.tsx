import { Route } from 'react-router-dom';

import Redirect from '@/tkeel-console-portal-tenant/pages/Redirect';
import SetPassword from '@/tkeel-console-portal-tenant/pages/SetPassword';

export default (
  <Route path="/auth">
    <Route path="set-password" element={<SetPassword />} />
    <Route path="redirect" element={<Redirect />} />
  </Route>
);
