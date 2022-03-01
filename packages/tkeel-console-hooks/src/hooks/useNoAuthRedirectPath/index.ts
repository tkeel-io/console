import { useLocation } from 'react-router-dom';

import { getNoAuthRedirectPath } from '@tkeel/console-utils';

type Options = {
  platformName: 'admin' | 'tenant';
  basePath?: string;
};

export default function useNoAuthRedirectPath({
  platformName,
  basePath,
}: Options) {
  const location = useLocation();

  return getNoAuthRedirectPath({ platformName, basePath, location });
}
