import { useLocation } from 'react-router-dom';
import { PlatformNames } from '@tkeel/console-constants';
import { getNoAuthRedirectPath } from '@tkeel/console-utils';

type Options = {
  platformName: PlatformNames;
  basePath?: string;
};

export default function useNoAuthRedirectPath({
  platformName,
  basePath,
}: Options) {
  const location = useLocation();

  return getNoAuthRedirectPath({ platformName, basePath, location });
}
