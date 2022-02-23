// import { Text } from '@chakra-ui/react';
import { Alert } from '@tkeel/console-components';

// import { User } from '@/tkeel-console-plugin-tenant-users/hooks/queries/useUsersQuery';

type Props = {
  // data: User;
  name: string;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  onConfirm: () => unknown;
};

export default function DeleteSubscriptionModal({
  // data,
  name,
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  // const { username } = data;
  // const username = '123';
  // console.log('isOpen', isOpen);

  return (
    <Alert
      iconPosition="left"
      icon="warning"
      title={
        <>
          确认删除订阅
          {/* <Text as="span" color="red.300">
            删除
          </Text> */}
          &nbsp;「{name}」？
        </>
      }
      description="删除订阅后不可恢复，请谨慎操作。"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
