import store from 'store2';

import { DEFAULT_PORTAL_NAME } from '@tkeel/console-constants';
import { TokenInfo } from '@tkeel/console-types';

import { getGlobalConfig } from '../global-config';

const namespace = getGlobalConfig()?.portalName ?? DEFAULT_PORTAL_NAME;
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
