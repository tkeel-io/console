import { useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { LeftRightFilledIcon } from '@tkeel/console-icons';
import { useRevokePortalTenantTokenMutation } from '@tkeel/console-request-hooks';
import {
  getLocalTokenInfo,
  jumpToTenantAuthTenantPage,
} from '@tkeel/console-utils';

export default function LogoutTenantButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, mutate } = useRevokePortalTenantTokenMutation({
    onSuccess() {
      jumpToTenantAuthTenantPage({
        isRemoveLocalTenantInfo: true,
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
