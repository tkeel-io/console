import { useDisclosure } from '@chakra-ui/react';

import { CreateTelemetryModal } from '@tkeel/console-business-components';
import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
import {
  BaseRequestData as TelemetryFormFields,
  useCreateTelemetryMutation,
} from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

type Props = {
  id: string;
  refetch?: () => void;
  defaultValues?: TelemetryFormFields;
};

export default function EditTelemetryButton({
  id,
  refetch = () => {},
  defaultValues,
}: Props) {
  const toast = plugin.getPortalToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = useCreateTelemetryMutation({
    id,
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
        data: params,
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
      <CreateTelemetryModal
        title="编辑遥测"
        isOpen={isOpen}
        defaultValues={defaultValues}
        // isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
