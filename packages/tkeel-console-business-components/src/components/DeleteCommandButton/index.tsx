import { useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { useDeleteCommandMutation } from '@tkeel/console-request-hooks/src/hooks/mutations';
import { CommandItem } from '@tkeel/console-types';
import { plugin } from '@tkeel/console-utils';

interface Props {
  uid: string;
  data: CommandItem;
  refetch?: () => void;
}

export default function DeleteCommandButton({
  uid,
  data,
  refetch = () => {},
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name, id } = data;
  const toast = plugin.getPortalToast();
  const { isLoading, mutate } = useDeleteCommandMutation({
    uid,
    onSuccess: () => {
      toast.success('删除成功');
      onClose();
      refetch();
    },
  });
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleDeleteCommand = () => {
    const ids = [id];
    mutate({ data: { ids } });
  };
  return (
    <>
      <MoreActionButton
        icon={<TrashFilledIcon size="12px" color="grayAlternatives.300" />}
        title="删除命令"
        onClick={onOpen}
      />
      <Alert
        icon="warning"
        iconPosition="left"
        isOpen={isOpen}
        isConfirmButtonLoading={isLoading}
        description={`命令ID: ${id} `}
        title={`确定要删除命令「${name}」吗？`}
        onClose={onClose}
        onConfirm={handleDeleteCommand}
      />
    </>
  );
}
