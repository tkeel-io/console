import store from 'store2';

import { TokenInfo } from '@tkeel/console-types';

const namespace =
  GLOBAL_PLUGIN_CONFIG?.portalName ?? GLOBAL_PORTAL_CONFIG?.portalName;
const key = 'tokenInfo';
const authStore = store.namespace(namespace);

export function getLocalTokenInfo(): TokenInfo {
  return authStore.get(key) as TokenInfo;
}

export function setLocalTokenInfo(value: TokenInfo) {
  authStore.set(key, value);
}

export function removeLocalTokenInfo() {
  authStore.remove(key);
}

export function hasLocalTokenInfo() {
  return authStore.has(key);
}
