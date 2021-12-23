import React from 'react';
import { RouteObject } from 'react-router-dom';

import Detail from '@/pages/Detail';
import Index from '@/pages/Index';

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
