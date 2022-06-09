import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import { NotFound } from '@tkeel/console-business-components';

import Layout from '../components/Layout';
import { ROUTES } from '../constants/routes';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Layout />}>
        <Route index element={ROUTES[0].element} />
        {ROUTES.map(({ value, element }) => (
          <Route key={value} path={value} element={element} />
        ))}
      </Route>
      <Route path="*" element={<NotFound />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
