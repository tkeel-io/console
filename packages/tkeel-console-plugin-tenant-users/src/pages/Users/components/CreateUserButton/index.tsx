import { Text, useDisclosure } from '@chakra-ui/react';

import {
  SetPasswordModal,
  useSetPasswordUrl,
} from '@tkeel/console-business-components';
import { CreateButton, LinkButton } from '@tkeel/console-components';
import { jumpToPage } from '@tkeel/console-utils';

import useCreateUserMutation from '@/tkeel-console-plugin-tenant-users/hooks/mutations/useCreateUserMutation';
import useLogoutMutation from '@/tkeel-console-plugin-tenant-users/hooks/mutations/useLogoutMutation';
import { FormValues } from '@/tkeel-console-plugin-tenant-users/pages/Users/components/BaseUserModal';
import CreateUserModal from '@/tkeel-console-plugin-tenant-users/pages/Users/components/CreateUserModal';

type Props = {
  onSuccess: () => void;
};

export default function CreateUserButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSuccessModalOpen,
    onOpen: onSuccessModalOpen,
    onClose: onSuccessModalClose,
  } = useDisclosure();
  const {
    isLoading: isCreateUserLoading,
    mutate: createUserMutate,
    data,
  } = useCreateUserMutation({
    onSuccess() {
      onSuccess();
      onClose();
      onSuccessModalOpen();
    },
  });

  const { isLoading: isSetPasswordUrlLoading, setPasswordUrl } =
    useSetPasswordUrl({
      data: { reset_key: data?.reset_key ?? '' },
    });

  const { refreshToken, mutate: logoutMutate } = useLogoutMutation({
    onSuccess() {
      jumpToPage({ path: setPasswordUrl });
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    createUserMutate({
      data: {
        username: formValues.username,
        nick_name: formValues?.nick_name ?? '',
        roles: formValues?.roleIds,
      },
    });
  };

  return (
    <>
      <CreateButton onClick={onOpen}>创建用户</CreateButton>
      {isOpen && (
        <CreateUserModal
          isOpen={isOpen}
          isConfirmButtonLoading={isCreateUserLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
      {isSuccessModalOpen && (
        <SetPasswordModal
          isOpen={isSuccessModalOpen}
          title="创建用户成功"
          description={
            <Text>
              可
              <LinkButton
                isLoading
                onClick={() =>
                  logoutMutate({
                    data: {
                      refresh_token: refreshToken,
                    },
                  })
                }
              >
                「立即设置」
              </LinkButton>
              该用户密码；或复制下方链接，邀请您的同事完成设置。
            </Text>
          }
          url={setPasswordUrl}
          isLoading={isSetPasswordUrlLoading}
          onClose={onSuccessModalClose}
        />
      )}
    </>
  );
}
