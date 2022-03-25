import { Text, useDisclosure } from '@chakra-ui/react';

import { CreateButton } from '@tkeel/console-components';

import AddDevicesModal from '../AddDevicesModal';

export interface DeviceItem {
  id: string;
  name: string;
  status: 'online' | 'offline';
  templateName: string;
  parentName: string;
}

type Props = {
  type?: 'button' | 'link';
  handleSelectDevices: (devices: DeviceItem[]) => unknown;
};

export default function AddDeviceButton({
  type = 'button',
  handleSelectDevices,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {type === 'button' ? (
        <CreateButton onClick={onOpen}>选择设备</CreateButton>
      ) : (
        <Text
          color="primary"
          fontSize="14px"
          lineHeight="32px"
          fontWeight="500"
          cursor="pointer"
          onClick={onOpen}
        >
          添加设备
        </Text>
      )}
      <AddDevicesModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={(devices) => {
          onClose();
          const newDevices: DeviceItem[] = devices.map((device) => {
            const { id, properties } = device;
            const { basicInfo, connectInfo } = properties || {};
            const name = basicInfo?.name;
            const templateName = basicInfo?.templateName;
            const parentName = basicInfo?.parentName;
            // eslint-disable-next-line no-underscore-dangle
            const online = connectInfo?._online;
            return {
              id,
              name,
              status: online ? 'online' : 'offline',
              templateName,
              parentName,
            };
          });
          handleSelectDevices(newDevices);
        }}
      />
    </>
  );
}
