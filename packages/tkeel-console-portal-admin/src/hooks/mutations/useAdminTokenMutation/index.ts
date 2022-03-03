import { usePortalMutation } from '@tkeel/console-hooks';

interface RequestParams {
  password?: string;
}

export interface ApiData {
  '@type': string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

const url = '/rudder/v1/oauth2/admin';
const method = 'GET';

type Options = {
  onSuccess: ({ data }: { data: ApiData }) => void;
};

export default function useAdminTokenMutation({ onSuccess }: Options) {
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
