import { useMutation } from '@tkeel/console-hooks';
import {
  crossEnv,
  removeLocalTenantInfo,
  removeLocalTokenInfo,
} from '@tkeel/console-utils';

interface RequestData {
  refresh_token: string;
}

interface ApiData {
  '@type': string;
  tenant_id: string;
  revoked: boolean;
}

interface Options {
  isRemoveLocalTokenInfo?: boolean;
  isRemoveLocalTenantInfo?: boolean;
  onSuccess: ({ data }: { data: ApiData }) => void;
}

export type { RequestData };

export default function useRevokePortalTenantTokenMutation({
  isRemoveLocalTokenInfo = true,
  isRemoveLocalTenantInfo = false,
  onSuccess,
}: Options) {
  const tokenInfo = crossEnv.getLocalTokenInfo();
  const refreshToken = tokenInfo?.refresh_token;

  const result = useMutation<ApiData, undefined, RequestData>({
    url: '/security/v1/oauth/token/revoke',
    method: 'POST',
    reactQueryOptions: {
      onSuccess: (data) => {
        if (isRemoveLocalTokenInfo) {
          removeLocalTokenInfo();
        }

        if (isRemoveLocalTenantInfo) {
          removeLocalTenantInfo();
        }

        onSuccess({ data: data.data });
      },
    },
  });

  return { ...result, tokenInfo, refreshToken };
}
