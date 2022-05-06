import { Circle, useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { CommandWindowFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useDeleteNetworkMutation from '@/tkeel-console-plugin-tenant-networks/hooks/mutations/useDeleteNetworkMutation';

type Props = {
  cruxData: {
    id: string;
    name: string;
  };
  refetch?: () => void;
  onDeleteSuccess?: () => unknown;
};

function InstallButton({ cruxData, refetch, onDeleteSuccess }: Props) {
  const { id, name } = cruxData;
  const toast = plugin.getPortalToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useDeleteNetworkMutation({
    id,
    onSuccess() {
      toast('删除成功', { status: 'success' });
      onClose();
      if (refetch) refetch();
      if (onDeleteSuccess) onDeleteSuccess();
    },
  });

  const handleConfirm = () => {
    mutate({});
  };

  return (
    <>
      <MoreActionButton
        icon={<CommandWindowFilledIcon />}
        title="在线安装命令"
        onClick={onOpen}
      />
      {isOpen && (
        <Alert
          iconPosition="left"
          icon={
            <Circle size="44px" backgroundColor="red.50">
              <CommandWindowFilledIcon size="24px" color="red.300" />
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

export default InstallButton;
