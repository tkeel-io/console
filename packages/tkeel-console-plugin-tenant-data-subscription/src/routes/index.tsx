import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import Detail from '../pages/Detail';
import Index from '../pages/Index';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/detail" element={<Detail />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
