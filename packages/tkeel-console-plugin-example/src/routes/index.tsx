import React from 'react';
import { RouteObject } from 'react-router-dom';

import PageA from '@/pages/PageA';
import PluginList from '@/pages/PluginList';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PluginList />,
  },
  {
    path: 'page-a',
    element: <PageA />,
  },
];

export default routes;
