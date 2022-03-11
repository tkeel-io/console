import { Route } from 'react-router-dom';

import { NotFound } from '@tkeel/console-business-components';

import Login from '@/tkeel-console-portal-admin/pages/Login';

export default (
  <>
    <Route path="login" element={<Login />} />
    <Route path="" element={<NotFound />} />
    <Route path="*" element={<NotFound />} />
  </>
);
