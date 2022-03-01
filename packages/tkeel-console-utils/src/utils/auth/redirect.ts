import { Location } from 'react-router-dom';

import { PlatformNames } from '@tkeel/console-constants';

import { getLocalUserInfo } from '@/tkeel-console-utils/utils/auth/tenant-user';

// eslint-disable-next-line import/prefer-default-export
export function getNoAuthRedirectPath({
  portalName,
  basePath = '',
  location,
}: {
  portalName: 'admin' | 'tenant';
  location: Location;
  basePath?: string;
}) {
  let loginPath = '/auth/login';
  if (portalName === PlatformNames.TENANT) {
    const userInfo = getLocalUserInfo();
    const tenantId = userInfo?.tenant_id ?? '';
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
