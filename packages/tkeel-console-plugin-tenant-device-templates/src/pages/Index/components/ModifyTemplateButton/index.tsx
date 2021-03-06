import { useDisclosure } from '@chakra-ui/react';

import { CreateTemplateBasicModal } from '@tkeel/console-business-components';
import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
import { KeyDataType } from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

import { RequestData as FormValues } from '@/tkeel-console-plugin-tenant-device-templates/hooks/mutations/useCreateTemplateMutation';
import useModifyTemplateMutation from '@/tkeel-console-plugin-tenant-device-templates/hooks/mutations/useModifyTemplateMutation';

type Props = {
  onSuccess: () => void;
  data: KeyDataType;
};

export default function ModifyTemplateButton({ onSuccess, data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();
  const { mutate, isLoading } = useModifyTemplateMutation({
    onSuccess() {
      onSuccess();
      onClose();
      toast.success('操作成功');
    },
    id: data.id,
  });

  const handleConfirm = (formValues: FormValues) => {
    if (formValues) {
      mutate({
        data: formValues,
      });
    }
    return null;
  };
  const { description, title } = data;

  return (
    <>
      <MoreActionButton
        icon={<PencilFilledIcon size="12px" color="grayAlternatives.300" />}
        title="修改信息"
        onClick={() => {
          onOpen();
        }}
      />
      {isOpen && (
        <CreateTemplateBasicModal
          title="修改模板"
          defaultValues={{ description, name: title }}
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
