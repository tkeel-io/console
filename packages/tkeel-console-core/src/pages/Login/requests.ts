import { useMutation, useQuery } from '@tkeel/console-hooks';
import { request } from '@tkeel/console-utils';

export interface Params {
  grant_type: 'password' | 'authorization_code';
  username?: string;
  password?: string;
}

interface RequestConfigData {
  a: string;
  b: number;
}

interface ApiData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

const url = '/security/v1/oauth/token';
const method = 'GET';
const rData = {
  a: 'abc',
  b: 12,
};

export async function login(params: Params) {
  const result = await request<ApiData, RequestConfigData>({
    url,
    method,
    params,
    data: rData,
    extras: {
      isWithToken: false,
    },
  });

  return result;
}

async function f() {
  const { data } = await login({
    grant_type: 'password',
    username: 'string',
    password: '1',
  });

  const { access_token: at } = data;

  return at;
}

f();

export function useLogin(params: Params) {
  return useQuery<ApiData>({ url, method, params, data: rData });
}

export function useLoginMutation() {
  return useMutation<ApiData>({ url, method, data: rData });
}

// /rudder/v1/entries
