import React from 'react';
import { RouteObject } from 'react-router-dom';

import Index from '@/pages/Index';
import PageA from '@/pages/PageA';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: 'page-a',
    element: <PageA />,
  },
];

export default routes;
