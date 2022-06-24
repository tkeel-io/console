import { useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { LeftRightFilledIcon } from '@tkeel/console-icons';
import { useRevokePortalTenantTokenMutation } from '@tkeel/console-request-hooks';
import { jumpToTenantAuthTenantPage } from '@tkeel/console-utils';

export default function LogoutTenantButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, mutate, refreshToken } =
    useRevokePortalTenantTokenMutation({
      onSuccess() {
        jumpToTenantAuthTenantPage({
          isRemoveLocalTenantInfo: true,
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
        title="切换空间"
        icon={<LeftRightFilledIcon />}
        onClick={onOpen}
      />
      <Alert
        isOpen={isOpen}
        icon="warning"
        iconPosition="left"
        title="您确定要切换空间吗"
        description="切换空间将会退出登录"
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
