import { useDisclosure } from '@chakra-ui/react';

import { CreateButton } from '@tkeel/console-components';
import { useCreateTelemetryMutation } from '@tkeel/console-request-hooks';
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
  return (
    <>
      <CreateButton onClick={onOpen}>创建遥测</CreateButton>
      {isOpen && (
        <CreateTelemetryModal
          title="新建遥测"
          isOpen={isOpen}
          // isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={(formValues) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (formValues.define.ext.length > 0) {
              const obj = {};
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
              formValues.define.ext.forEach(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
                (el: { label: string; value: string }) => {
                  obj[el.label] = el.value;
                }
              );
              // eslint-disable-next-line no-param-reassign
              formValues.define.ext = obj;
            }
            mutate({
              data: { [formValues.id]: formValues },
            });
          }}
        />
      )}
    </>
  );
}
