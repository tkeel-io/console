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
  // refetchData: () => unknown;
  // onSuccess: () => void;
};

export default function DeleteDevicesButton({
  selectedDevices,
}: // refetchData,
// onSuccess,
Props) {
  const toast = plugin.getPortalToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const { mutate, isSuccess } = useDeleteDevicesMutation(id || '');

  if (isSuccess) {
    toast('移除设备成功', { status: 'success' });
  }
  // const { mutate } = useDeleteDeviceMutation({
  //   onSuccess() {
  //     onSuccess();
  //     toast('移除设备成功', { status: 'success' });
  //     refetchData();
  //     onClose();
  //   },
  // });

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
          // eslint-disable-next-line no-console
          onOpen();
          // console.log('停用插件');
          // mutate({});
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
        // isConfirmButtonLoading={isConfirmButtonLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
