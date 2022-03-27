import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
import { KeyDataType } from '@tkeel/console-request-hooks';

import { RequestData as FormValues } from '@/tkeel-console-plugin-tenant-device-templates/hooks/mutations/useCreateTemplateMutation';
import useModifyTemplateMutation from '@/tkeel-console-plugin-tenant-device-templates/hooks/mutations/useModifyTemplateMutation';

import CustomTemplateModal from '../CustomTemplateModal';

type Props = {
  onSuccess: () => void;
  data: KeyDataType;
};

export default function ModifyTemplateButton({ onSuccess, data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate, isLoading } = useModifyTemplateMutation({
    onSuccess() {
      onSuccess();
      onClose();
    },
    id: data.id,
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
        icon={<PencilFilledIcon />}
        title="修改信息"
        onClick={() => {
          onOpen();
        }}
      />
      {isOpen && (
        <CustomTemplateModal
          title="修改模板"
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
