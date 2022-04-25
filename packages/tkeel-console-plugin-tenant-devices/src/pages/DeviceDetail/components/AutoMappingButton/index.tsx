import { useDisclosure } from '@chakra-ui/react';

import { IconButton } from '@tkeel/console-components/src/components/Button';
import { DevopsFilledIcon } from '@tkeel/console-icons';
import { DeviceItem } from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

import useCreateRelationAutoMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateRelationAutoMutation';
import { DeviceObject } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';

import DeviceMappingModal from '../DeviceMappingModal';

interface Props {
  deviceObject: DeviceObject;
}

export default function AutoMappingButton({ deviceObject }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { id: uid, properties } = deviceObject;
  const toast = plugin.getPortalToast();
  const { mutate } = useCreateRelationAutoMutation({
    id: uid,
    onSuccess: () => {
      toast.success('操作成功');
      onClose();
    },
  });
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleConfirm = (device: DeviceItem) => {
    const curName = properties?.basicInfo?.name ?? '';
    const params = {
      curName,
      direction: 'from',
      relationType: 'contain',
      targetType: 'device',
      targetId: device.id,
      targetName: device.properties?.basicInfo?.name ?? '',
    };
    mutate({ data: params });

    // eslint-disable-next-line no-console
    console.log(params);
  };
  return (
    <>
      <IconButton
        style={{ padding: '0 12px' }}
        icon={<DevopsFilledIcon size="18px" color="white" />}
        onClick={onOpen}
      >
        自动映射
      </IconButton>
      <DeviceMappingModal
        uid={uid}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
