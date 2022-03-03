import { useDisclosure } from '@chakra-ui/react';
// import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { LeftRightFilledIcon } from '@tkeel/console-icons';
import {
  getLocalTokenInfo,
  removeLocalTenantInfo,
  removeLocalTokenInfo,
} from '@tkeel/console-utils';

import useRevokeTokenMutation from '@/tkeel-console-portal-tenant/hooks/mutations/useRevokeTokenMutation';

export default function LogoutTenantButton() {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, mutate } = useRevokeTokenMutation({
    onSuccess() {
      removeLocalTokenInfo();
      removeLocalTenantInfo();
      // queryClient.removeQueries();
      navigate('/auth/tenant', { replace: true });
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
