import React from 'react';
import { Navigate, Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import PageNotFound from '@/pages/PageNotFound';
import { IApp } from '@/utils/qiankun/types';

type Props = {
  data: IApp[];
};

function Routes({ data }: Props) {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Navigate replace to={data[0].activeRule} />} />
      {data.map(({ name, container, activeRule }) => {
        return (
          <Route
            key={name}
            path={`${activeRule}/*`}
            element={<div id={container.replace(/^#/, '')} />}
          />
        );
      })}
      <Route path="*" element={<PageNotFound />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
