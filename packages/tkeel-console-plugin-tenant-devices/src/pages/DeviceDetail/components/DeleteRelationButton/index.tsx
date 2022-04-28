import { useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useDeleteDeviceRelationMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useDeleteDeviceRelationMutation';

interface Props {
  uid: string;
  path: string;
  type: 'telemetry' | 'attributes';
  refetch?: () => void;
}

export default function DeleteRelationButton({
  uid,
  path,
  type,
  refetch = () => {},
}: Props) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();
  const { isLoading, mutate } = useDeleteDeviceRelationMutation({
    uid,
    onSuccess: () => {
      toast.success('删除成功');
      onClose();
      refetch();
    },
  });
  const handleConfirm = () => {
    mutate({ data: { paths: [`${type}.${path}`] } });
  };
  return (
    <>
      <MoreActionButton
        title="解除关系"
        onClick={onOpen}
        icon={<TrashFilledIcon size="12px" color="grayAlternatives.300" />}
      />
      <Alert
        isOpen={isOpen}
        onClose={onClose}
        title="解除关系"
        description={`确认解除${
          type === 'telemetry' ? '遥测' : '属性'
        }「${path}」的关系映射？`}
        iconPosition="left"
        icon="error"
        onConfirm={handleConfirm}
        isConfirmButtonLoading={isLoading}
      />
    </>
  );
}
