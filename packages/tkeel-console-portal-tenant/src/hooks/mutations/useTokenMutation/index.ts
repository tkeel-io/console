import { usePortalMutation } from '@tkeel/console-hooks';

interface RequestParams {
  grant_type: 'password' | 'authorization_code';
  username: string;
  password: string;
}

export interface ApiData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

const method = 'GET';

type Options = {
  tenantId: string;
  onSuccess: ({ data }: { data: ApiData }) => void;
};

export default function useOAuthTokenMutation({
  tenantId,
  onSuccess,
}: Options) {
  const url = `/security/v1/oauth/${tenantId}/token`;

  return usePortalMutation<ApiData, RequestParams>({
    url,
    method,
    reactQueryOptions: {
      onSuccess,
    },
    extras: {
      isWithToken: false,
      handleNoAuth: false,
    },
  });
}
