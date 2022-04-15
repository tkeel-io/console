import { Box, Flex, Text } from '@chakra-ui/react';

import { PageHeader } from '@tkeel/console-components';
import { GearTwoToneIcon } from '@tkeel/console-icons';

export default function Index() {
  return (
    <Box>
      <PageHeader icon={<GearTwoToneIcon size={26} />} name="定制化配置" />
      <Flex
        flexDirection="column"
        marginTop="16px"
        padding="24px 28px"
        backgroundColor="white"
      >
        <Text
          color="gray.800"
          fontSize="16px"
          fontWeight="600"
          lineHeight="22px"
        >
          定制化配置
        </Text>
        <Text
          marginTop="4px"
          color="gray.500"
          fontSize="14px"
          lineHeight="20px"
        >
          对平台进行外观配置与功能菜单配置
        </Text>
        <Flex marginTop="10px" padding="24px 32px" backgroundColor="gray.50">
          主题色配置
        </Flex>
      </Flex>
    </Box>
  );
}
