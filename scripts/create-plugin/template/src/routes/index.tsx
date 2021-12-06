import React from 'react';
import { RouteObject } from 'react-router-dom';

import Index from '@/pages/Index';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Index />,
  },
];

export default routes;
