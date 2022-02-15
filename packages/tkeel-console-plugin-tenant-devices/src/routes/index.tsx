import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import Index from '../pages/Index';

import DeviceDetail from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/detail" element={<DeviceDetail />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
