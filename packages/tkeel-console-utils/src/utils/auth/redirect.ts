import { Location } from 'react-router-dom';
import { PlatformNames } from '@tkeel/console-constants';

// import { getLocalTokenData } from '@/tkeel-console-utils/utils/auth/token';

// eslint-disable-next-line import/prefer-default-export
export function getNoAuthRedirectPath({
  platformName,
  basePath = '',
  location,
}: {
  platformName?: PlatformNames;
  location: Location;
  basePath?: string;
}) {
  let loginPath = '/auth/login';
  if (platformName === PlatformNames.TENANT) {
    // const tokenData = getLocalTokenData();
    // TODO: temp
    const tenantId = 2;
    loginPath += `/${tenantId}`;
  }
  const { pathname, search, hash } = location;
  const url = `${basePath}${pathname}${search}${hash}`.trim();

  if (['', '/'].includes(url)) {
    return loginPath;
  }

  const redirect = encodeURIComponent(url);

  return `${loginPath}?redirect=${redirect}`;
}
