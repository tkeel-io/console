import React from 'react';
import { RouteObject } from 'react-router-dom';

import Detail from '@/plugin-plugins/pages/Detail';
import Index from '@/plugin-plugins/pages/Index';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/detail/:id',
    element: <Detail />,
  },
];

export default routes;
