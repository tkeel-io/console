import { useDisclosure } from '@chakra-ui/react';

import { IconButton, MoreActionButton } from '@tkeel/console-components';
import { FloppyDiskFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useSaveAsOtherTemplateMutation, {
  RequestData as TemplateBasicField,
} from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useSaveAsOtherTemplateMutation';
import CreateTemplateModal from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/CreateTemplateModal';

type Props = {
  deviceId: string;
  variant?: string;
};

export default function SyncTemplateButton({ deviceId, variant }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();
  const { mutate, isLoading } = useSaveAsOtherTemplateMutation({
    id: deviceId,
    onSuccess: () => {
      onClose();
      toast.success('另存为模版成功');
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
          保存为模版
        </IconButton>
      ) : (
        <MoreActionButton
          icon={
            <FloppyDiskFilledIcon size="12px" color="grayAlternatives.300" />
          }
          title="另存为模版"
          onClick={onOpen}
        />
      )}
      <CreateTemplateModal
        isOpen={isOpen}
        title="另存为模版"
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
