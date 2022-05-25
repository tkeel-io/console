import { useDisclosure } from '@chakra-ui/react';

import { CreateButton } from '@tkeel/console-components';
import {
  TelemetryFormFields,
  useCreateTelemetryMutation,
} from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

import DeviceTelemetryModal from '../DeviceTelemetryModal';

type Props = {
  uid: string;
  refetch: () => void;
};

export default function CreateTelemetryButton({
  uid,
  refetch = () => {},
}: Props) {
  const toast = plugin.getPortalToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useCreateTelemetryMutation({
    uid,
    onSuccess() {
      onClose();
      toast('创建遥测成功', { status: 'success' });
      refetch();
    },
  });
  const handleConfirm = (formValues: TelemetryFormFields) => {
    mutate({
      data: { [formValues.id]: formValues },
    });
  };

  return (
    <>
      <CreateButton onClick={onOpen}>添加遥测</CreateButton>
      <DeviceTelemetryModal
        isEdit={false}
        isOpen={isOpen}
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
