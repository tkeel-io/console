import { useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useDeleteDevicesMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useDeleteDevicesMutation';

type Props = {
  selectedDevices: {
    id: string;
    name: string;
  }[];
  refetchData: () => unknown;
};

export default function DeleteDevicesButton({
  selectedDevices,
  refetchData,
}: Props) {
  const toast = plugin.getPortalToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const { mutate, isLoading } = useDeleteDevicesMutation({
    ruleId: id || '',
    onSuccess() {
      // TODO 移除设备后有延迟，临时处理方案
      setTimeout(() => {
        toast('移除设备成功', { status: 'success' });
        refetchData();
        onClose();
      }, 1000);
    },
  });

  const handleConfirm = () => {
    if (id && selectedDevices.length > 0) {
      mutate({
        params: {
          devices_ids: selectedDevices.map((device) => device.id).join(','),
        },
      });
    }
  };

  return (
    <>
      <MoreActionButton
        icon={<TrashFilledIcon />}
        title="移除设备"
        onClick={() => {
          onOpen();
        }}
      />
      <Alert
        iconPosition="left"
        icon="warning"
        title={
          <>
            确认移除设备
            {selectedDevices.map(({ name }) => `「${name}」`)}？
          </>
        }
        description="移除后不可恢复，请谨慎操作。"
        isOpen={isOpen}
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
