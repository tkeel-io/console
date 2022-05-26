import { useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { ShutdownFilledIcon } from '@tkeel/console-icons';
import { useRevokePortalTenantTokenMutation } from '@tkeel/console-request-hooks';
import { getLocalTokenInfo, jumpToAuthLoginPage } from '@tkeel/console-utils';

export default function LogoutUserButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, mutate } = useRevokePortalTenantTokenMutation({
    onSuccess({ data }) {
      const tenantId = data?.tenant_id ?? '';
      jumpToAuthLoginPage({
        portalName: 'tenant',
        tenantId,
        isRemoveLocalTokenInfo: true,
        isReplace: true,
      });
    },
  });
  const handleConfirm = () => {
    const tokenInfo = getLocalTokenInfo();
    mutate({ data: { refresh_token: tokenInfo.refresh_token } });
  };

  return (
    <>
      <MoreActionButton
        title="退出登录"
        icon={<ShutdownFilledIcon />}
        onClick={onOpen}
      />
      <Alert
        isOpen={isOpen}
        icon="warning"
        iconPosition="left"
        title="您确定要退出登录吗"
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
