import { Box, Flex, Text } from '@chakra-ui/react';

function Index(): JSX.Element {
  return (
    <Box>
      <Flex height="28px" justifyContent="space-between">
        <Text>数据订阅</Text>
        <Text>创建订阅</Text>
      </Flex>

      <Box border="1px solid #E2E8F0" borderRadius="4px" background="#FFF">
        <Flex
          padding="0 20"
          height="53px"
          alignItems="center"
          borderBottom="1px solid #E2E8F0"
        >
          <Box
            fontWeight="600"
            fontSize="14px"
            color="#242E42"
            marginRight="12px"
          >
            我的订阅
          </Box>
          <Box fontSize="12px" color=" #6B7B95">
            IDC b1会议室所有设备IDC b1会议室所有设备IDC b1会议室所有设备IDC
            b1会议室所有设备...
          </Box>
          <Box>测试</Box>
        </Flex>
        <Flex
          padding="0 20"
          background="#F9FBFD"
          height="40px"
          alignItems="center"
        >
          <Box fontSize="12px" color="#36435C">
            订阅设备：1098
          </Box>
          <Box>订阅ID：OIE9009</Box>
          <Box>订阅地址：amqp://host:port/virtual_host</Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default Index;
