import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useDeleteTemplateMutation from '@/tkeel-console-plugin-tenant-device-templates/hooks/mutations/useDeleteTemplateMutation';

import DeleteSubscriptionModal from '../DeleteTemplateModal';

type Props = {
  id: string;
  name: string;
  refetchData: () => unknown;
};

function DeleteTemplateButton({ id, refetchData, name }: Props) {
  const toast = plugin.getPortalToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useDeleteTemplateMutation({
    onSuccess() {
      toast('删除成功', { status: 'success' });
      refetchData();
      onClose();
    },
  });

  const handleConfirm = () => {
    mutate({ data: { ids: [id] } });
  };
  return (
    <>
      <MoreActionButton
        icon={<TrashFilledIcon size="12px" color="grayAlternatives.300" />}
        title="删除模板"
        onClick={() => {
          onOpen();
        }}
      />

      <DeleteSubscriptionModal
        name={name}
        isOpen={isOpen}
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default DeleteTemplateButton;
