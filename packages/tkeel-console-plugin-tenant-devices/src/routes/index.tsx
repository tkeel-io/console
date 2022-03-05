import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import { NotFound } from '@tkeel/console-business-components';

import DeviceDetail from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail';
import Index from '@/tkeel-console-plugin-tenant-devices/pages/Index';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/detail" element={<DeviceDetail />} />
      <Route path="*" element={<NotFound />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
