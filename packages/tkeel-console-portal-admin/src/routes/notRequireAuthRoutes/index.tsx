import { Route } from 'react-router-dom';

import Login from '@/tkeel-console-portal-admin/pages/Login';
import NotFound from '@/tkeel-console-portal-admin/pages/NotFound';

export default (
  <>
    <Route path="login" element={<Login />} />
    <Route path="*" element={<NotFound />} />
  </>
);
