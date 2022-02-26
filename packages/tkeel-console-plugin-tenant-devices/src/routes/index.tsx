import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import DeviceDetail from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail';

import Index from '../pages/Index';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/detail" element={<DeviceDetail />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
