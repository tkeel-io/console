import { Text, useDisclosure } from '@chakra-ui/react';
import { Alert, LinkButton } from '@tkeel/console-components';

import useGetResetPasswordKeyMutation from '@/tkeel-console-plugin-tenant-users/hooks/mutations/useGetResetPasswordKeyMutation';
import { User } from '@/tkeel-console-plugin-tenant-users/hooks/queries/useUsersQuery';
import SetPasswordModal from '@/tkeel-console-plugin-tenant-users/pages/Index/components/SetPasswordModal';

type Props = {
  data: User;
};

export default function ResetPasswordButton({ data }: Props) {
  const { tenant_id: tenantId, user_id: userId, username } = data;
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const {
    isOpen: isSetPasswordModalOpen,
    onOpen: onSetPasswordModalOpen,
    onClose: onSetPasswordModalClose,
  } = useDisclosure();
  const {
    data: resetData,
    mutate,
    isLoading,
  } = useGetResetPasswordKeyMutation({
    tenantId,
    userId,
    onSuccess() {
      onAlertClose();
      onSetPasswordModalOpen();
    },
  });

  const handleConfirm = () => {
    mutate({});
  };

  return (
    <>
      <LinkButton onClick={onAlertOpen}>重置密码</LinkButton>
      {isAlertOpen && (
        <Alert
          iconPosition="left"
          icon="warning"
          title={
            <>
              确认为用户「{username}」&nbsp;
              <Text as="span" color="red.300">
                重置密码
              </Text>
              &nbsp;？
            </>
          }
          description="删除后不可恢复，请谨慎操作。"
          isOpen={isAlertOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onAlertClose}
          onConfirm={handleConfirm}
        />
      )}
      {isSetPasswordModalOpen && (
        <SetPasswordModal
          isOpen={isSetPasswordModalOpen}
          data={{ reset_key: resetData?.reset_key ?? '' }}
          title="重置成功"
          onClose={onSetPasswordModalClose}
        />
      )}
    </>
  );
}
