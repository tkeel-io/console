import qs from 'qs';
import { Location, NavigateFunction } from 'react-router-dom';

import { isPortal } from '../env';
import { getPortalProps } from '../plugin';
import { getLocalTenantInfo, removeLocalTenantInfo } from './local-tenant-info';
import { removeLocalTokenInfo } from './local-token-info';

type JumpToPageOptions = {
  path?: string;
  isReplace?: boolean;
  isNewWindow?: boolean;
  navigate?: NavigateFunction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state?: any;
};

export function jumpToPage({
  path = '/',
  isReplace,
  isNewWindow,
  navigate,
  state,
}: JumpToPageOptions) {
  if (typeof navigate === 'function') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    navigate(path, { replace: isReplace, state });
  } else if (isReplace) {
    window.location.replace(path);
  } else if (isNewWindow) {
    window.open(path, '_blank');
  } else {
    window.location.assign(path);
  }
}

type JumpToTenantAuthTenantPageOptions = {
  isRemoveLocalTokenInfo?: boolean;
  isRemoveLocalTenantInfo?: boolean;
  isReplace?: boolean;
  navigate?: NavigateFunction;
};

export function jumpToTenantAuthTenantPage({
  isRemoveLocalTokenInfo = false,
  isRemoveLocalTenantInfo = false,
  isReplace = false,
  navigate,
}: JumpToTenantAuthTenantPageOptions) {
  const path = '/auth/tenant';

  if (isRemoveLocalTokenInfo) {
    removeLocalTokenInfo();
  }

  if (isRemoveLocalTenantInfo) {
    removeLocalTenantInfo();
  }

  jumpToPage({ path, isReplace, navigate });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JumpToAuthLoginPageOptions<TSearchParams = Record<string, any>> = {
  portalName: 'admin' | 'tenant';
  tenantId?: string;
  searchParams?: TSearchParams;
  path?: string;
  isRemoveLocalTokenInfo?: boolean;
  isReplace?: boolean;
  navigate?: NavigateFunction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state?: any;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function jumpToAuthLoginPage<TSearchParams = Record<string, any>>({
  portalName,
  tenantId = '',
  searchParams,
  path,
  isRemoveLocalTokenInfo = false,
  isReplace = false,
  navigate,
  state,
}: JumpToAuthLoginPageOptions<TSearchParams>) {
  let loginPath = '';

  if (path) {
    loginPath = path;
  } else {
    loginPath = '/auth/login';
    if (portalName === 'tenant') {
      loginPath += `/${tenantId}`;
    }
    const query = qs.stringify(searchParams, { addQueryPrefix: true });
    loginPath += `${query}`;
  }

  if (isRemoveLocalTokenInfo) {
    removeLocalTokenInfo();
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  jumpToPage({ path: loginPath, isReplace, navigate, state });
}

type GetNoAuthRedirectPathOptions = {
  portalName: 'admin' | 'tenant';
  basePath?: string;
  location: Location;
};

export function getNoAuthRedirectPath({
  portalName,
  basePath = '',
  location,
}: GetNoAuthRedirectPathOptions) {
  let loginPath = '/auth/login';

  if (portalName === 'tenant') {
    let tenantId = '';
    if (isPortal()) {
      const tenantInfo = getLocalTenantInfo();
      tenantId = tenantInfo?.tenant_id;
    } else {
      const portalProps = getPortalProps();
      tenantId = portalProps.client.tenantInfo.tenant_id;
    }

    loginPath += `/${tenantId || ''}`;
  }

  const { pathname, search, hash } = location;
  const url = `${basePath}${pathname}${search}${hash}`.trim();

  if (['', '/'].includes(url)) {
    return loginPath;
  }

  const redirect = encodeURIComponent(url);

  return `${loginPath}?redirect=${redirect}`;
}
