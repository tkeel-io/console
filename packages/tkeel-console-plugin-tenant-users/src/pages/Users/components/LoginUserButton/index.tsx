import { useDisclosure } from '@chakra-ui/react';

import { LinkButton } from '@tkeel/console-components';
import type { User } from '@tkeel/console-request-hooks';
import { useRevokePortalTenantTokenMutation } from '@tkeel/console-request-hooks';
import { jumpToAuthLoginPage } from '@tkeel/console-utils';

import LoginUserModal from '@/tkeel-console-plugin-tenant-users/pages/Users/components/LoginUserModal';

interface Props {
  data: User;
}

export default function LoginUserButton({ data }: Props) {
  const { tenant_id: tenantId, username } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, mutate, refreshToken } =
    useRevokePortalTenantTokenMutation({
      onSuccess() {
        jumpToAuthLoginPage({
          portalName: 'tenant',
          tenantId,
          searchParams: { username },
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
