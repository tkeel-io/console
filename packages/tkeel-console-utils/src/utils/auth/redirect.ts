import qs from 'qs';
import { Location, NavigateFunction } from 'react-router-dom';

import { getLocalTenantInfo, removeLocalTenantInfo } from './local-tenant-info';
import { removeLocalTokenInfo } from './local-token-info';

type JumpToPageOptions = {
  path?: string;
  isReplace?: boolean;
  navigate?: NavigateFunction;
};

export function jumpToPage({
  path = '/',
  isReplace,
  navigate,
}: JumpToPageOptions) {
  if (typeof navigate === 'function') {
    navigate(path, { replace: isReplace });
  } else if (isReplace) {
    window.location.replace(path);
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

type JumpToAuthLoginPageOptions<TSearchParams = Record<string, any>> = {
  portalName: 'admin' | 'tenant';
  tenantId?: string;
  searchParams?: TSearchParams;
  path?: string;
  isRemoveLocalTokenInfo?: boolean;
  isReplace?: boolean;
  navigate?: NavigateFunction;
};

export function jumpToAuthLoginPage<TSearchParams = Record<string, any>>({
  portalName,
  tenantId = '',
  searchParams,
  path,
  isRemoveLocalTokenInfo = false,
  isReplace = false,
  navigate,
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

  jumpToPage({ path: loginPath, isReplace, navigate });
}

type GetNoAuthRedirectPathOptions = {
  portalName: 'admin' | 'tenant';
  tenantId?: string;
  basePath?: string;
  location: Location;
};

export function getNoAuthRedirectPath({
  portalName,
  tenantId = '',
  basePath = '',
  location,
}: GetNoAuthRedirectPathOptions) {
  let loginPath = '/auth/login';

  if (portalName === 'tenant') {
    // TODO: tmp
    loginPath += `/${tenantId || getLocalTenantInfo()?.tenant_id || ''}`;
  }

  const { pathname, search, hash } = location;
  const url = `${basePath}${pathname}${search}${hash}`.trim();

  if (['', '/'].includes(url)) {
    return loginPath;
  }

  const redirect = encodeURIComponent(url);

  return `${loginPath}?redirect=${redirect}`;
}
