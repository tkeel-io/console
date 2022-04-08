import { Text, useDisclosure } from '@chakra-ui/react';

import { CreateButton } from '@tkeel/console-components';

import { RouteType } from '@/tkeel-console-plugin-tenant-routing-rules/components/RouteLabel';

import AddGroupDevicesModal from '../AddGroupDevicesModal';
import AddTemplateDevicesModal from '../AddTemplateDevicesModal';

type Props = {
  type?: 'button' | 'link';
  routeType: RouteType;
  refetchData: () => unknown;
};

export default function AddDeviceButton({
  type = 'button',
  routeType,
  refetchData,
}: Props) {
  // eslint-disable-next-line no-console
  console.log('routeType', routeType);
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
      {routeType === 'msg' ? (
        <AddTemplateDevicesModal isOpen={isOpen} onClose={onClose} />
      ) : (
        <AddGroupDevicesModal
          isOpen={isOpen}
          onClose={onClose}
          refetchData={refetchData}
        />
      )}
    </>
  );
}
