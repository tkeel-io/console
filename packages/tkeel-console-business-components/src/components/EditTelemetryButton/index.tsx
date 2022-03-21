import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
// import useCreateSubscribeMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useCreateSubscribeMutation';
import { baseRequestData as FormValues } from '@tkeel/console-request-hooks';

import CreateTelemetryModal from '../CreateTelemetryModal';

type Props = {
  handleSubmit: (values: FormValues) => void;
};

export default function EditTelemetryButton({
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
      <MoreActionButton
        icon={<PencilFilledIcon />}
        title="修改遥测"
        onClick={() => {
          // eslint-disable-next-line no-console
          onOpen();
          // console.log('停用插件');
          // mutate({});
        }}
      />

      <CreateTelemetryModal
        title="修改遥测"
        isOpen={isOpen}
        // isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleSubmit}
      />
    </>
  );
}
