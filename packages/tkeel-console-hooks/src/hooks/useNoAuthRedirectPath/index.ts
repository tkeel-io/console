import { useLocation } from 'react-router-dom';

import { getNoAuthRedirectPath } from '@tkeel/console-utils';

type Options = {
  portalName: 'admin' | 'tenant';
  basePath?: string;
};

export default function useNoAuthRedirectPath({
  portalName,
  basePath,
}: Options) {
  const location = useLocation();

  return getNoAuthRedirectPath({ portalName, basePath, location });
}
