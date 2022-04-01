import { Alert } from '@tkeel/console-components';

type Props = {
  name: string[];
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  onConfirm: () => unknown;
};

export default function DeleteSubscriptionModal({
  name,
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
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
