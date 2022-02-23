import { Flex, Image, Text } from '@chakra-ui/react';

import searchEmpty from '@/tkeel-console-plugin-tenant-data-query/assets/images/search-empty.svg';

export default function Empty() {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Image width="70px" src={searchEmpty} />
      <Text color="gray.400" fontSize="12px" lineHeight="20px">
        支持关键字搜索，支持设备分组、设备模版搜索
      </Text>
    </Flex>
  );
}
