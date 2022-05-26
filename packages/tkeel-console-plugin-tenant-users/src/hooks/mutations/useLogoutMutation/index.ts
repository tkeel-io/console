import { useRevokePortalTenantTokenMutation } from '@tkeel/console-request-hooks';
import { plugin, removeLocalTokenInfo } from '@tkeel/console-utils';

interface Options {
  isRemoveLocalTokenInfo?: boolean;
  onSuccess: () => void;
}

export default function useLogoutMutation({
  isRemoveLocalTokenInfo = true,
  onSuccess,
}: Options) {
  const portalProps = plugin.getPortalProps();
  const refreshToken = portalProps?.client.tokenInfo.refresh_token;
  const result = useRevokePortalTenantTokenMutation({
    onSuccess: () => {
      if (isRemoveLocalTokenInfo) {
        removeLocalTokenInfo();
      }
      onSuccess();
    },
  });

  return { ...result, refreshToken };
}
