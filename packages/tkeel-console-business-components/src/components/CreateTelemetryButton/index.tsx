import { useDisclosure } from '@chakra-ui/react';
import { useCreateTelemetryMutation } from '@tkeel/console-request-hooks';
import { CreateButton } from '@tkeel/console-components';

// import useCreateSubscribeMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useCreateSubscribeMutation';
// import { baseRequestData as FormValues } from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

import CreateTelemetryModal from '../CreateTelemetryModal';

type Props = {
  // handleSubmit: (values: FormValues) => void;
  id: string;
  refetchData: () => void;
};

export default function CreateTelemetryTableButton({ id, refetchData }: Props) {
  const toast = plugin.getPortalToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = useCreateTelemetryMutation({
    id,
    onSuccess() {
      onClose();
      toast('创建遥测成功', { status: 'success' });
      refetchData();
    },
  });
  // const handleConfirm = (formValues: FormValues) => {
  //   const { title, description } = formValues;
  //   if (formValues) {
  //     mutate({
  //       data: {
  //         title,
  //         description,
  //       },
  //     });
  //   }
  //   return null;
  // };

  return (
    <>
      <CreateButton onClick={onOpen}>创建遥测</CreateButton>
      <CreateTelemetryModal
        title="新建遥测"
        isOpen={isOpen}
        // isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={(formValues) => {
          // eslint-disable-next-line no-console
          console.log('add', formValues);
          mutate({
            data: { [formValues.id]: formValues },
          });
        }}
      />
    </>
  );
}
