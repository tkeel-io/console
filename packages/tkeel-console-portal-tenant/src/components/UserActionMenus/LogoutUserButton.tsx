import { useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { ShutdownFilledIcon } from '@tkeel/console-icons';
import { useRevokePortalTenantTokenMutation } from '@tkeel/console-request-hooks';
import { jumpToAuthLoginPage } from '@tkeel/console-utils';

export default function LogoutUserButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, mutate, refreshToken } =
    useRevokePortalTenantTokenMutation({
      onSuccess({ data }) {
        const tenantId = data?.tenant_id ?? '';
        jumpToAuthLoginPage({
          portalName: 'tenant',
          tenantId,
          isReplace: true,
        });
      },
    });
  const handleConfirm = () => {
    mutate({ data: { refresh_token: refreshToken } });
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
