import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { FloppyDiskFilledIcon } from '@tkeel/console-icons';
import { KeyDataType } from '@tkeel/console-request-hooks';

import useCreateTemplateMutation, {
  RequestData as FormValues,
} from '@/tkeel-console-plugin-tenant-device-templates/hooks/mutations/useCreateTemplateMutation';

import CustomTemplateModal from '../CustomTemplateModal';

type Props = {
  onSuccess: () => void;
  data: KeyDataType;
};

export default function SaveAsTemplateButton({ onSuccess, data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate, isLoading } = useCreateTemplateMutation({
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    const { name, description } = formValues;
    if (formValues) {
      mutate({
        data: {
          name,
          description,
        },
      });
    }
    return null;
  };

  return (
    <>
      <MoreActionButton
        icon={<FloppyDiskFilledIcon />}
        title="另存为模板"
        onClick={() => {
          onOpen();
        }}
      />
      {isOpen && (
        <CustomTemplateModal
          title="另存为模板"
          defaultValues={{ ...data, name: data.title }}
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
