import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import { NotFound } from '@tkeel/console-business-components';

import Detail from '../pages/Detail';
import Index from '../pages/Index';
import SearchResult from '../pages/SearchResult';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/search-result" element={<SearchResult />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="*" element={<NotFound />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
