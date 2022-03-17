import { Center, StyleProps, Text } from '@chakra-ui/react';

import AddDeviceButton from '../AddDevicesButton';

type Props = {
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function DeviceTable({ styles }: Props) {
  return (
    <Center
      height="104px"
      backgroundColor="gray.100"
      borderRadius="4px"
      {...styles?.wrapper}
    >
      <Text color="gray.600" fontSize="14px" lineHeight="32px">
        暂未选择任何设备数据，请
      </Text>
      <AddDeviceButton type="link" />
    </Center>
  );
}
