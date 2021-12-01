import React from 'react';
import { useRoutes } from 'react-router-dom';

import PageNotFound from '@/components/PageNotFound';
import { IApp } from '@/utils/qiankun/types';

type Props = {
  data: IApp[];
};

function Routes({ data }: Props) {
  const config = data.map(({ container, activeRule }) => ({
    path: `${activeRule}/*`,
    element: <div id={container.replace(/^#/, '')} />,
  }));

  config.push({
    path: '*',
    element: <PageNotFound />,
  });

  return useRoutes(config);
}

export default Routes;
