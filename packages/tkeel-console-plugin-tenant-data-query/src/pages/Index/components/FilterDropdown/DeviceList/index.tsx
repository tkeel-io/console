import { Box, Flex, Text } from '@chakra-ui/react';

import { BoxTwoToneIcon, VpcTwoToneIcon } from '@tkeel/console-icons';

import Rectangle from '@/tkeel-console-plugin-tenant-data-query/components/Rectangle';

export default function DeviceList() {
  return (
    <Box padding="8px 10px" backgroundColor="gray.50" lineHeight="24px">
      {Array.from({ length: 10 })
        .fill('')
        .map((_, i) => (
          <Flex
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            marginBottom="16px"
            alignItems="center"
            cursor="pointer"
          >
            <Flex alignItems="center" flex="1">
              <BoxTwoToneIcon size={18} />
              <Text
                marginLeft="10px"
                color="gray.700"
                fontSize="14px"
                fontWeight="600"
              >
                IDC设备模版B
              </Text>
            </Flex>
            <Text color="gray.600" fontSize="12px">
              默认分组
            </Text>
            <Text marginLeft="18px" color="gray.800" fontSize="12px">
              SIC电表
            </Text>
            <Flex marginLeft="50px" alignItems="center">
              <Rectangle
                icon={<VpcTwoToneIcon color="primary" twoToneColor="primary" />}
                backgroundColor="primarySub"
              />
              <Rectangle
                backgroundColor="green.300"
                opacity="0.1"
                style={{ marginLeft: '8px' }}
              />
            </Flex>
          </Flex>
        ))}
    </Box>
  );
}
