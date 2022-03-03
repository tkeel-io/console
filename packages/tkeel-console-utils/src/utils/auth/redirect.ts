import { Location } from 'react-router-dom';

import { PortalNames } from '@tkeel/console-constants';

import { getLocalTenantInfo } from '@/tkeel-console-utils/utils/auth/tenant';

type Options = {
  portalName: 'admin' | 'tenant';
  location: Location;
  basePath?: string;
};

// eslint-disable-next-line import/prefer-default-export
export function getNoAuthRedirectPath({
  portalName,
  basePath = '',
  location,
}: Options) {
  let loginPath = '/auth/login';

  if (portalName === PortalNames.TENANT) {
    const tenantInfo = getLocalTenantInfo();
    const tenantId = tenantInfo?.tenant_id ?? '';
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
