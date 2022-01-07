export interface RequestParams {
  grant_type: 'password' | 'authorization_code';
  username?: string;
  password?: string;
}

export interface ApiData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}
