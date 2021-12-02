import React from 'react';
import { Navigate, Route, Routes as ReactRouterRoutes } from 'react-router-dom';

// import { Navigate, useRoutes } from 'react-router-dom';
import PageNotFound from '@/components/PageNotFound';
import { IApp } from '@/utils/qiankun/types';

type Props = {
  data: IApp[];
};

// function Routes({ data }: Props) {
//   const dataConfig = data.map(({ container, activeRule }) => ({
//     path: `${activeRule}/*`,
//     element: <div id={container.replace(/^#/, '')} />,
//   }));

//   const config = [
//     {
//       path: '/',
//       element: <Navigate replace to={data[0].activeRule} />,
//     },
//     ...dataConfig,
//     {
//       path: '*',
//       element: <PageNotFound />,
//     },
//   ];

//   return useRoutes(config);
// }

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
