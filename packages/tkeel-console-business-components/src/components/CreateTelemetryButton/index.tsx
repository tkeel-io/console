import { useDisclosure } from '@chakra-ui/react';

import { CreateButton } from '@tkeel/console-components';

// import useCreateSubscribeMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useCreateSubscribeMutation';
import { baseRequestData as FormValues } from '@tkeel/console-request-hooks';

import CreateTelemetryModal from '../CreateTelemetryModal';

type Props = {
  handleSubmit: (values: FormValues) => void;
};

export default function CreateTelemetryTableButton({
  handleSubmit = () => {},
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        onConfirm={handleSubmit}
      />
    </>
  );
}
