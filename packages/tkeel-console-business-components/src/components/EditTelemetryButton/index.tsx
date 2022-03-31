import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
// import useCreateSubscribeMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useCreateSubscribeMutation';
import { BaseRequestData as FormValues } from '@tkeel/console-request-hooks';

import CreateTelemetryModal from '../CreateTelemetryModal';

type Props = {
  handleSubmit: (values: FormValues) => void;
  defaultValues?: FormValues;
};

export default function EditTelemetryButton({
  handleSubmit = () => {},
  defaultValues,
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
      <MoreActionButton
        icon={<PencilFilledIcon size="12px" color="grayAlternatives.300" />}
        title="修改遥测"
        onClick={() => {
          onOpen();
          // mutate({});
        }}
      />

      {isOpen && (
        <CreateTelemetryModal
          title="修改遥测"
          isOpen={isOpen}
          defaultValues={defaultValues}
          // isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleSubmit}
        />
      )}
    </>
  );
}
