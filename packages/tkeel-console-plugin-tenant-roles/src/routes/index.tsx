import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import Roles from '../pages/Roles';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Roles />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
