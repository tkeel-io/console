import React from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import Index from '@/tkeel-console-plugin-example/pages/Index';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Index />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
