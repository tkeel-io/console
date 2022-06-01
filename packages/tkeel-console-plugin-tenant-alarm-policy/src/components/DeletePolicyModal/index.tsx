import { Text } from '@chakra-ui/react';

import { Alert } from '@tkeel/console-components';

type Props = {
  ruleName: string;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  onConfirm: () => unknown;
};

export default function DeletePolicyModal({
  ruleName,
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
          确认&nbsp;
          <Text as="span" color="red.300">
            删除
          </Text>
          &nbsp;告警策略「{ruleName}」？
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
