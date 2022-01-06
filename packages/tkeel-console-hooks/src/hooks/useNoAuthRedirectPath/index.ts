import { useLocation } from 'react-router-dom';
import { getNoAuthRedirectPath } from '@tkeel/console-utils';

type Options = {
  basePath?: string;
};

export default function useNoAuthRedirectPath(options?: Options) {
  const basePath = options?.basePath ?? '';

  const location = useLocation();

  return getNoAuthRedirectPath({ basePath, location });
}
