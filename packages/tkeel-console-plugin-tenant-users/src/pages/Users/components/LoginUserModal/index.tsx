import { Text } from '@chakra-ui/react';

import { Alert } from '@tkeel/console-components';
import { User } from '@tkeel/console-request-hooks';

type Props = {
  data: User;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function LoginUserModal({
  data,
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  const { username } = data;

  return (
    <Alert
      iconPosition="left"
      icon="warning"
      title={
        <>
          确认&nbsp;
          <Text as="span" color="primary">
            登录
          </Text>
          &nbsp;用户「{username}」？
        </>
      }
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
