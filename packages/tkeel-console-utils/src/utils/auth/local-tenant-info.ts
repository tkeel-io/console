import store from 'store2';

import { TenantInfo } from '@tkeel/console-types';

const namespace = 'tenant';
const key = 'tenantInfo';
const tenantStore = store.namespace(namespace);

export function getLocalTenantInfo(): TenantInfo {
  return tenantStore.get(key) as TenantInfo;
}

export function setLocalTenantInfo(value: TenantInfo) {
  tenantStore.set(key, value);
}

export function removeLocalTenantInfo() {
  tenantStore.remove(key);
}

export function hasLocalTenantInfo() {
  return tenantStore.has(key);
}
