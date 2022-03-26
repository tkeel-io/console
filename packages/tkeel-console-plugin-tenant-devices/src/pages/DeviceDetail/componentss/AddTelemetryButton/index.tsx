import { useDisclosure } from '@chakra-ui/react';

import { CreateTelemetryModal } from '@tkeel/console-business-components';
import { CreateButton } from '@tkeel/console-components';
import {
  BaseRequestData as FormFields,
  useCreateTelemetryMutation,
} from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

type Props = {
  // handleSubmit: (values: FormValues) => void;
  id: string;
  refetch: () => void;
};

export default function AddTelemetryButton({ id, refetch = () => {} }: Props) {
  const toast = plugin.getPortalToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = useCreateTelemetryMutation({
    id,
    onSuccess() {
      onClose();
      toast('创建遥测成功', { status: 'success' });
      refetch();
    },
  });
  const handleConfirm = (formValues: FormFields) => {
    if (formValues) {
      const params = {
        [formValues.id]: { ...formValues },
      };
      mutate({
        data: params,
      });
    }
    return null;
  };

  return (
    <>
      <CreateButton onClick={onOpen}>添加遥测</CreateButton>
      <CreateTelemetryModal
        title="新建遥测"
        isOpen={isOpen}
        // isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
