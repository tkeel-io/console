import { Text } from '@chakra-ui/react';

import { Alert } from '@tkeel/console-components';
import { User } from '@tkeel/console-request-hooks';

type Props = {
  data: User;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  onConfirm: () => unknown;
};

export default function DeleteUserModal({
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
          <Text as="span" color="red.300">
            删除
          </Text>
          &nbsp;用户「{username}」？
        </>
      }
      description="删除后不可恢复，请谨慎操作。"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
