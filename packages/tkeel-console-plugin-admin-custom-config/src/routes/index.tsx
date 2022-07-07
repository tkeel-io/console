import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import { NotFound } from '@tkeel/console-business-components';

import AppearanceConfig from '../pages/AppearanceConfig';
import Index from '../pages/Index';
import ThemeColorConfig from '../pages/ThemeColorConfig';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/theme-color-config" element={<ThemeColorConfig />} />
      <Route path="/appearance-config" element={<AppearanceConfig />} />
      <Route path="*" element={<NotFound />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
