import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { ShutdownFilledIcon } from '@tkeel/console-icons';
import { removeLocalTokenInfo } from '@tkeel/console-utils';

import useAdminLogoutMutation from '@/tkeel-console-portal-admin/hooks/mutations/useAdminLogoutMutation';

export default function LogoutUserButton() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, mutate } = useAdminLogoutMutation({
    onSuccess() {
      removeLocalTokenInfo();
      navigate('/auth/login', { replace: true });
    },
  });
  const handleConfirm = () => {
    mutate();
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
