import { TokenInfo } from '@tkeel/console-types';
import store from 'store2';

const namespace = `${GLOBAL_CONFIG.platformName}`;
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
