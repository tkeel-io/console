import store from 'store2';

const namespace = 'auth';
const key = 'tokenData';
const authStore = store.namespace(namespace);

// custom codes
export interface TokenData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

export function getLocalTokenData(): TokenData {
  return authStore.get(key) as TokenData;
}

export function setLocalTokenData(tokenData: TokenData) {
  authStore.set(key, tokenData);
}

export function removeLocalTokenData() {
  authStore.remove(key);
}
