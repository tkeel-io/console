import { TokenData } from '@tkeel/console-types';
import store from 'store2';

const namespace = 'auth';
const key = 'tokenData';
const authStore = store.namespace(namespace);

export function getLocalTokenData(): TokenData {
  return authStore.get(key) as TokenData;
}

export function setLocalTokenData(tokenData: TokenData) {
  authStore.set(key, tokenData);
}

export function removeLocalTokenData() {
  authStore.remove(key);
}
