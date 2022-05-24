import { Button, useDisclosure } from '@chakra-ui/react';

import { AddDevicesModal } from '@tkeel/console-business-components';
import { AddFilledIcon } from '@tkeel/console-icons';
import { DeviceItem } from '@tkeel/console-request-hooks';

interface Props {
  deviceMsg: (device: { deviceId: string; deviceName: string }) => unknown;
}

export default function BindDeviceButton({ deviceMsg }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onConfirm = (devices: DeviceItem[]) => {
    deviceMsg({
      deviceId: devices[0]?.id,
      deviceName: devices[0]?.properties?.basicInfo?.name,
    });
    onClose();
  };

  return (
    <>
      <Button
        leftIcon={<AddFilledIcon />}
        type="button"
        variant="outline"
        height="32px"
        width="220px"
        fontSize="12px"
        borderRadius="4px"
        backgroundColor="gray.50"
        color="grayAlternatives.300"
        onClick={onOpen}
      >
        绑定设备
      </Button>
      <AddDevicesModal
        type="all"
        title="绑定设备"
        isMultipleChoice={false}
        isOpen={isOpen}
        isLoading={false}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    </>
  );
}
