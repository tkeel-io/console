import React from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import Detail from '@/tkeel-console-plugin-plugins/pages/Detail';
import Index from '@/tkeel-console-plugin-plugins/pages/Index';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/detail/:id" element={<Detail />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
