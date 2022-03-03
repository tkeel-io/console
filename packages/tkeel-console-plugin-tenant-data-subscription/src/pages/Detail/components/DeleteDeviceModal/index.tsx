import { Alert } from '@tkeel/console-components';

type Props = {
  // data: User;
  name: string[];
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
          确认移除设备
          {name.map((item) => {
            return `「${item}」`;
          })}
          ？
        </>
      }
      description="移除后不可恢复，请谨慎操作。"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
