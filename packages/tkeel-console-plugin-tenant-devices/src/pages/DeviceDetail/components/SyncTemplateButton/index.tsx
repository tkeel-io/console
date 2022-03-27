import { useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { ResourceFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useSaveAsSelfTemplateMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useSaveAsSelfTemplateMutation';

type Props = {
  deviceId: string;
};

export default function SyncTemplateButton({ deviceId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();
  const { mutate, isLoading } = useSaveAsSelfTemplateMutation({
    id: deviceId,
    onSuccess: () => {
      onClose();
      toast.success('同步模版成功');
    },
  });
  const handleConfirm = () => {
    mutate({});
  };
  return (
    <>
      <MoreActionButton
        icon={<ResourceFilledIcon size="12px" color="grayAlternatives.300" />}
        title="同步到模版"
        onClick={onOpen}
      />
      <Alert
        isOpen={isOpen}
        icon="warning"
        iconPosition="left"
        title="您确定要同步到模版吗？"
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
