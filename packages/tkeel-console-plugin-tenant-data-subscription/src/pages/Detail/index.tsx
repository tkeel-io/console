import { Box, Flex, Text } from '@chakra-ui/react';

function BaseInfo(name = '', value = '') {
  return (
    <Flex fontSize=" 12px" mb="4px">
      <Box color=" #6B7B95" width="100px">
        {name}
      </Box>
      <Box flex="1 " color=" #242E42">
        {value}
      </Box>
    </Flex>
  );
}

function Detail(): JSX.Element {
  return (
    <Flex>
      <Box width="360px" mr="20px">
        <Box
          height="150px"
          background="linear-gradient(180deg, #FFFFFF 0%, #F9FBFD 100%)"
          borderRadius="4px"
        >
          1
        </Box>
        <Box
          height="210px"
          mt="12px"
          background="linear-gradient(180deg, #FFFFFF 0%, #F9FBFD 100%)"
          borderRadius="4px"
          padding="12px 20px"
        >
          <Text fontWeight="600" fontSize="14px" color="#36435C" mb="12px">
            基本信息
          </Text>

          {BaseInfo('订阅ID', 'OIE9009')}
          {BaseInfo('订阅数量', '0台设备')}
          {BaseInfo('创建时间', '2020.12.21 12:43:41')}
          {BaseInfo(
            '描述',
            'IDC b1会议室所有设备IDC b1会议室所有设备IDC b1会议室所有设备IDC b1会议室所有设备...'
          )}
        </Box>
      </Box>
      <Box
        flex="1"
        height="90vh"
        background="linear-gradient(180deg, #FFFFFF 0%, #F9FBFD 100%)"
        borderRadius="4px"
      >
        3
      </Box>
    </Flex>
  );
}

export default Detail;
