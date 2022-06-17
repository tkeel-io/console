import { Text, useDisclosure } from '@chakra-ui/react';

import {
  SetPasswordModal,
  useSetPasswordUrl,
} from '@tkeel/console-business-components';
import { Alert, LinkButton } from '@tkeel/console-components';
import {
  useGetResetPasswordKeyMutation,
  User,
} from '@tkeel/console-request-hooks';
import { jumpToPage } from '@tkeel/console-utils';

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
    isLoading: isGetResetPasswordKeyLoading,
  } = useGetResetPasswordKeyMutation({
    tenantId,
    userId,
    onSuccess() {
      onAlertClose();
      onSetPasswordModalOpen();
    },
  });

  const { isLoading: isSetPasswordUrlLoading, setPasswordUrl } =
    useSetPasswordUrl({
      data: { reset_key: resetData?.reset_key ?? '' },
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
          isOpen={isAlertOpen}
          isConfirmButtonLoading={isGetResetPasswordKeyLoading}
          onClose={onAlertClose}
          onConfirm={handleConfirm}
        />
      )}
      {isSetPasswordModalOpen && (
        <SetPasswordModal
          isOpen={isSetPasswordModalOpen}
          title="重置密码请求成功"
          description={
            <Text>
              可
              <LinkButton
                onClick={() =>
                  jumpToPage({
                    path: setPasswordUrl,
                    isNewWindow: true,
                  })
                }
              >
                「立即重置」
              </LinkButton>
              该用户密码；或复制下方链接，邀请您的同事完成重置。
            </Text>
          }
          url={setPasswordUrl}
          isLoading={isSetPasswordUrlLoading}
          onClose={onSetPasswordModalClose}
        />
      )}
    </>
  );
}
