import { Box, Flex, Text } from '@chakra-ui/react';

import { BoxTwoToneIcon } from '@tkeel/console-icons';

export default function DeviceTemplates() {
  return (
    <Box>
      {Array.from({ length: 10 })
        .fill('')
        .map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Flex key={i} marginBottom="18px" cursor="pointer">
            <BoxTwoToneIcon size={18} />
            <Text
              marginLeft="10px"
              lineHeight="18px"
              color="gray.700"
              fontSize="14px"
              fontWeight="600"
            >
              IDC设备模版B
            </Text>
          </Flex>
        ))}
    </Box>
  );
}
