import { useMutation, useQuery } from '@tkeel/console-hooks';
import { request } from '@tkeel/console-utils';

type Url = '/security/v1/oauth/token';

type Method = 'GET';

export interface Params {
  grant_type: 'password' | 'authorization_code';
  username?: string;
  password?: string;
}

interface Data {
  a: string;
}

interface ApiData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

export async function login(params: Params) {
  const url: Url = '/security/v1/oauth/token';
  const method: Method = 'GET';
  const data: Data = {
    a: '123',
  };
  const ret = await request<ApiData>({
    url,
    method,
    params,
    data,
    extras: {
      isWithToken: false,
    },
  });

  return ret;
}

export function useLogin(params: Params) {
  const url: Url = '/security/v1/oauth/token';
  const method: Method = 'GET';
  const data: Data = {
    a: '123',
  };
  return useQuery<ApiData>({ url, method, params, data });
}

export function useLoginMutation(params: Params) {
  const url: Url = '/security/v1/oauth/token';
  const method: Method = 'GET';
  const data: Data = {
    a: '123',
  };
  return useMutation<ApiData>({ url, method, params, data });
}

// /rudder/v1/entries
