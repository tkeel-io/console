import { Circle, useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useDeleteProxyMutation from '@/tkeel-console-plugin-tenant-networks/hooks/mutations/useDeleteProxyMutation';

interface Props {
  cruxData: {
    id: string;
    name: string;
  };
  refetch?: () => void;
}

function DeleteButton({ cruxData, refetch }: Props) {
  const { id, name } = cruxData;
  const toast = plugin.getPortalToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useDeleteProxyMutation({
    id,
    onSuccess() {
      toast('删除成功', { status: 'success' });
      onClose();
      if (refetch) refetch();
    },
  });

  const handleConfirm = () => {
    mutate({});
  };

  return (
    <>
      <MoreActionButton
        icon={<TrashFilledIcon />}
        title="删除代理服务"
        onClick={onOpen}
      />
      {isOpen && (
        <Alert
          iconPosition="left"
          icon={
            <Circle size="44px" backgroundColor="red.50">
              <TrashFilledIcon size="24px" color="red.300" />
            </Circle>
          }
          title={`确认删除代理网关「${name}」？`}
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}

export default DeleteButton;
