import { useRoutes } from 'react-router-dom';

import routes from '@/routes';

function Routes() {
  const element = useRoutes(routes);
  return element;
}

export default Routes;
