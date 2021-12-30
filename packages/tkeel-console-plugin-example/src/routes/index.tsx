import React from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import Index from '@/pages/Index';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Index />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
