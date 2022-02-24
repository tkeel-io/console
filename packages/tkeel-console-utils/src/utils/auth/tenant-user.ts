import store from 'store2';

export interface UserInfo {
  avatar: string;
  expires_in: string;
  external_id: string;
  nick_name: string;
  tenant_id: string;
  user_id: string;
  username: string;
}

const namespace = 'tenant';
const key = 'userInfo';
const tenantStore = store.namespace(namespace);

export function getLocalUserInfo(): UserInfo {
  return tenantStore.get(key) as UserInfo;
}

export function setLocalUserInfo(value: UserInfo) {
  tenantStore.set(key, value);
}

export function removeLocalUserInfo() {
  tenantStore.remove(key);
}

export function hasLocalUserInfo() {
  return tenantStore.has(key);
}
