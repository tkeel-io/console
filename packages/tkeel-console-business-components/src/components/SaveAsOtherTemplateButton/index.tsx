import { useDisclosure } from '@chakra-ui/react';

import { IconButton, MoreActionButton } from '@tkeel/console-components';
import { FloppyDiskFilledIcon } from '@tkeel/console-icons';
import useSaveAsOtherTemplateMutation, {
  RequestData as TemplateBasicField,
} from '@tkeel/console-request-hooks/src/hooks/mutations/useSaveAsOtherTemplateMutation';
import { plugin } from '@tkeel/console-utils';

import CreateTemplateBasicModal from '../CreateTemplateBasicModal';

type Props = {
  id: string;
  variant?: string;
  refetch?: () => void;
};

export default function SaveAsOtherTemplateButton({
  id,
  variant,
  refetch = () => {},
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();
  const { mutate, isLoading } = useSaveAsOtherTemplateMutation({
    id,
    onSuccess: () => {
      onClose();
      refetch();
      toast.success('另存为模板成功');
    },
  });
  const handleConfirm = (formValues: TemplateBasicField) => {
    mutate({ data: formValues });
  };
  return (
    <>
      {variant === 'iconButton' ? (
        <IconButton
          icon={<FloppyDiskFilledIcon size="12px" color="white" />}
          colorScheme="gray"
          onClick={onOpen}
        >
          保存为模板
        </IconButton>
      ) : (
        <MoreActionButton
          icon={
            <FloppyDiskFilledIcon size="12px" color="grayAlternatives.300" />
          }
          title="另存为模板"
          onClick={onOpen}
        />
      )}
      <CreateTemplateBasicModal
        isOpen={isOpen}
        title="另存为模板"
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
