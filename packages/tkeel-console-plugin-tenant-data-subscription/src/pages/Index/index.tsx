import { Box, Flex, Text } from '@chakra-ui/react';
import { BookOpenedFilledIcon } from '@tkeel/console-icons';

import CreateUserButton from './components/CreateUserButton';

function SubscriptionCard() {
  return (
    <Box
      bg="#F9FBFD"
      boxShadow="0px 8px 8px rgba(152, 163, 180, 0.1)"
      borderRadius="4px"
      mt="20px"
      paddingBottom="20px"
    >
      <Text
        fontWeight="600"
        fontSize="14px"
        color="#242E42"
        mt="20px"
        mb="12px"
        display="inline-block"
        padding="0 20"
      >
        更多订阅
      </Text>
      <Flex flexWrap="wrap" paddingLeft="20px">
        {[0, 0, 0, 0].map((index) => {
          return (
            <Box
              borderRadius="4px"
              background="#F9FBFD"
              border="1px solid #E2E8F0"
              flex="1"
              key={index}
              margin="0 20px 12px 0"
            >
              <Flex height="76px" flexDir="column" padding="0 20">
                <Box lineHeight="50px">IDC设备分组订阅</Box>
                <Text color="#6B7B95" fontSize="12px">
                  IDC b1会议室所有设备IDC b1会议室所有设备IDC
                  b1会议室所有设备IDC b1会议室所有设备...
                </Text>
              </Flex>
              <Flex
                background="#FFFFFF"
                height="40px"
                alignItems="center"
                fontSize="12px"
                borderRadius="0 0 4px 4px"
                padding="0 20"
              >
                <Box color="#36435C">
                  订阅设备：
                  <Text display="inline" color="#2580FF">
                    1098
                  </Text>
                </Box>
                <Box ml="40px">
                  订阅ID：
                  <Text display="inline">OIE9009</Text>
                </Box>
                <Box ml="40px">
                  订阅地址：
                  <Text display="inline">amqp://host:port/virtual_host</Text>
                </Box>
              </Flex>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
}

const handleCreateUserSuccess = () => {
  // queryClient.invalidateQueries(queryKey);
};

function Index(): JSX.Element {
  return (
    <Box>
      <Flex height="30px" alignItems="center" justifyContent="space-between">
        <Flex
          fontWeight="600"
          fontSize="14px"
          color="#2D3748"
          alignItems="center"
          lineHeight="20px"
        >
          数据订阅 <BookOpenedFilledIcon style={{ marginLeft: '4px' }} />
        </Flex>
        <CreateUserButton key="create" onSuccess={handleCreateUserSuccess} />
      </Flex>
      <Box
        border="1px solid #E2E8F0"
        borderRadius="4px"
        background="#FFF"
        mt="16px"
      >
        <Flex
          padding="0 20"
          lineHeight="53px"
          borderBottom="1px solid #E2E8F0"
          fontWeight="600"
          fontSize="14px"
          color="#242E42"
        >
          我的订阅
          <Text display="inline" color="#6B7B95" ml="12px" fontSize="12px">
            IDC b1会议室所有设备IDC b1会议室所有设备IDC b1会议室所有设备IDC
            b1会议室所有设备...
          </Text>
        </Flex>
        <Flex
          padding="0 20"
          background="#F9FBFD"
          height="40px"
          alignItems="center"
          fontSize="12px"
        >
          <Box color="#36435C">
            订阅设备：
            <Text display="inline" color="#2580FF">
              1098
            </Text>
          </Box>
          <Box ml="40px">
            订阅ID：
            <Text display="inline">OIE9009</Text>
          </Box>
          <Box ml="40px">
            订阅地址：
            <Text display="inline">amqp://host:port/virtual_host</Text>
          </Box>
        </Flex>
      </Box>
      {SubscriptionCard()}
    </Box>
  );
}

export default Index;
