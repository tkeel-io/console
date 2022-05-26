import { useDisclosure } from '@chakra-ui/react';

import { LinkButton } from '@tkeel/console-components';
import type { User } from '@tkeel/console-request-hooks';
import { jumpToAuthLoginPage } from '@tkeel/console-utils';

import useLogoutMutation from '@/tkeel-console-plugin-tenant-users/hooks/mutations/useLogoutMutation';
import LoginUserModal from '@/tkeel-console-plugin-tenant-users/pages/Users/components/LoginUserModal';

interface Props {
  data: User;
}

export default function LoginUserButton({ data }: Props) {
  const { tenant_id: tenantId, username } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { refreshToken, isLoading, mutate } = useLogoutMutation({
    onSuccess() {
      jumpToAuthLoginPage({
        portalName: 'tenant',
        tenantId,
        searchParams: { username },
        isRemoveLocalTokenInfo: false,
        isReplace: true,
      });
      onClose();
    },
  });

  const handleConfirm = () => {
    mutate({ data: { refresh_token: refreshToken } });
  };

  return (
    <>
      <LinkButton onClick={onOpen}>登录</LinkButton>
      {isOpen && (
        <LoginUserModal
          data={data}
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
