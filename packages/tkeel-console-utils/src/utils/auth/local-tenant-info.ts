import store from 'store2';

export interface TenantInfo {
  tenant_id: string;
}

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
