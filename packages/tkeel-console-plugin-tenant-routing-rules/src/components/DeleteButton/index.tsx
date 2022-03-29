import { Circle, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useDeleteRulesMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useDeleteRulesMutation';

type Props = {
  cruxData: {
    id: string;
    name: string;
  };
  refetch?: () => void;
};

function DeleteButton({ cruxData, refetch }: Props) {
  const { id, name } = cruxData;
  const toast = plugin.getPortalToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useDeleteRulesMutation({
    id,
    onSuccess() {
      toast('删除成功', { status: 'success' });
      onClose();
      if (refetch) refetch();
    },
  });

  const handleConfirm = () => {
    mutate({});
    navigate('/');
  };
  return (
    <>
      <MoreActionButton
        icon={<TrashFilledIcon />}
        title="删除规则"
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
          title={`确认删除设备「${name}」？`}
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
