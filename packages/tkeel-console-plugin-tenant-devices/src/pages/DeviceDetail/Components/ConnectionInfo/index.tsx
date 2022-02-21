import { Box, Flex, Text } from '@chakra-ui/react';

const textTitleStyle = {
  color: 'grayAlternatives.300',
};

const textContentStyle = {
  color: 'gray.700',
};

const textBoxStyle = {
  minWidth: '70px',
  fontSize: '12px',
};

function Index() {
  return (
    <Box p="12px 20px">
      <Text
        fontSize="14px"
        fontWeight="600"
        h="32px"
        lineHeight="32px"
        mb="12px"
      >
        连接信息
      </Text>
      <Box bg="gray.50" borderRadius="4px" p="12px 12px" w="100%">
        <Flex
          justifyContent="space-between"
          bg="white"
          border="1px"
          borderColor="gray.100"
          borderRadius="4px"
          p="8px 20px 12px"
        >
          <Box {...textBoxStyle}>
            <Text {...textTitleStyle}>接入协议</Text>
            <Text {...textContentStyle}>MQTT v3.1.1</Text>
          </Box>
          <Box {...textBoxStyle}>
            <Text {...textTitleStyle}>客户端ID</Text>
            <Text {...textContentStyle}>clientID</Text>
          </Box>
          <Box {...textBoxStyle}>
            <Text {...textTitleStyle}>客户端端口</Text>
            <Text {...textContentStyle}>80</Text>
          </Box>
          <Box {...textBoxStyle}>
            <Text {...textTitleStyle}>客户端地址</Text>
            <Text {...textContentStyle}>10.10.137.64</Text>
          </Box>
          <Box {...textBoxStyle}>
            <Text {...textTitleStyle}>连接时间</Text>
            <Text {...textContentStyle}>2021-11-26 18:03:21</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default Index;
