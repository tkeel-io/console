import { Box, Flex, Text } from '@chakra-ui/react';

function Index() {
  const data = [
    {
      label: '接入协议',
      value: 'MQTT v3.1.1',
    },
    {
      label: '客户端ID',
      value: 'clientID',
    },
    {
      label: '客户端端口',
      value: '80',
    },
    {
      label: '客户端地址',
      value: '10.10.137.64',
    },
    {
      label: '连接时间',
      value: '2021-11-26 18:03:21',
    },
  ];
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
          {data.map((r) => {
            return (
              <Box minWidth="70px" fontSize="12px" key={r.label}>
                <Text color="grayAlternatives.300">{r.label}</Text>
                <Text color="gray.700">{r.value}</Text>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
}

export default Index;
