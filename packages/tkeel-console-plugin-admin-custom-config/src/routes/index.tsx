import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import { NotFound } from '@tkeel/console-business-components';

import AppearanceConfig from '../pages/AppearanceConfig';
import Index from '../pages/Index';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/appearance-config" element={<AppearanceConfig />} />
      <Route path="*" element={<NotFound />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
