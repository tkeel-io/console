import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
import {
  TelemetryFormFields,
  useCreateTelemetryMutation,
} from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

import DeviceTelemetryModal from '../DeviceTelemetryModal';

type Props = {
  uid: string;
  refetch?: () => void;
  defaultValues?: TelemetryFormFields;
  source: 'temp' | 'device';
};

export default function UpdateTelemetryButton({
  uid,
  refetch = () => {},
  defaultValues,
  source,
}: Props) {
  const toast = plugin.getPortalToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useCreateTelemetryMutation({
    uid,
    onSuccess() {
      onClose();
      toast('编辑遥测成功', { status: 'success' });
      refetch();
    },
  });
  const handleConfirm = (formValues: TelemetryFormFields) => {
    if (formValues) {
      const params = {
        [formValues.id]: { ...formValues },
      };
      mutate({
        data: {
          tele: params,
          source,
        },
      });
    }
    return null;
  };

  return (
    <>
      <MoreActionButton
        icon={<PencilFilledIcon size="12px" color="grayAlternatives.300" />}
        title="编辑遥测"
        onClick={onOpen}
      />
      <DeviceTelemetryModal
        isEdit
        isOpen={isOpen}
        defaultValues={defaultValues}
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
