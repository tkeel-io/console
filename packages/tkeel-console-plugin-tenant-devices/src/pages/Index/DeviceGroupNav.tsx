import { Box, Text } from '@chakra-ui/react';

import { CreateDeviceGroupButton } from '@/tkeel-console-plugin-tenant-devices/components/buttons';

export default function DeviceGroupNav() {
  return (
    <Box w="258px" bg="gray.50" h="100%" p="12px">
      <Text
        color="grayAlternatives.300"
        fontSize="12px"
        lineHeight="24px"
        fontWeight="500"
        mb="8px"
      >
        设备组
      </Text>
      <CreateDeviceGroupButton />
    </Box>
  );
}
