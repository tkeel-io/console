import { Box, Flex, Text } from '@chakra-ui/react';
import {
  BookOpenedFilledIcon,
  MessageWarningTwoToneIcon,
} from '@tkeel/console-icons';

import SubscriptionButton from './components/Button/SubscriptionButton';
import CreateUserButton from './components/CreateUserButton';

function SubscriptionCard() {
  return (
    <Box
      bg="gray.50"
      boxShadow="0px 8px 8px rgba(152, 163, 180, 0.1)"
      borderRadius="4px"
      mt="20px"
      paddingBottom="20px"
    >
      <Text
        fontWeight="600"
        fontSize="14px"
        color="gray.800"
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
              background="gray.50"
              border="1px"
              borderStyle="solid"
              borderColor="blue.50"
              flex="1"
              key={index}
              margin="0 20px 12px 0"
            >
              <Flex height="76px" flexDir="column" padding="0 20">
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center">
                    <MessageWarningTwoToneIcon
                      style={{ width: '24px', height: '22px' }}
                    />
                    <Box lineHeight="50px" ml="12px">
                      IDC设备分组订阅
                    </Box>
                    <Text
                      display="inline"
                      ml="12px"
                      color="orange.300"
                      background="orange.50"
                      width="44px"
                      fontSize="12px"
                      textAlign="center"
                    >
                      已订阅
                    </Text>
                  </Flex>

                  <Flex>
                    <SubscriptionButton
                      style={{
                        width: '60px',
                        height: '28px',
                        borderRadius: '4px',
                        marginLeft: '12px',
                      }}
                    >
                      订阅
                    </SubscriptionButton>
                  </Flex>
                </Flex>

                <Text color="grayAlternatives.300" fontSize="12px">
                  IDC b1会议室所有设备IDC b1会议室所有设备IDC
                  b1会议室所有设备IDC b1会议室所有设备...
                </Text>
              </Flex>
              <Flex
                background="white"
                height="40px"
                alignItems="center"
                fontSize="12px"
                borderRadius="0 0 4px 4px"
                padding="0 20"
              >
                <Box color="gray.700">
                  订阅设备：
                  <Text display="inline" color="primary">
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
          color="grayAlternatives.700"
          alignItems="center"
          lineHeight="20px"
        >
          数据订阅 <BookOpenedFilledIcon style={{ marginLeft: '4px' }} />
        </Flex>
        <CreateUserButton key="create" onSuccess={handleCreateUserSuccess} />
      </Flex>
      <Box
        border="1px solid grayAlternatives.50"
        borderRadius="4px"
        background="white"
        mt="16px"
      >
        <Flex
          padding="0 20"
          lineHeight="53px"
          borderBottom="1px solid grayAlternatives.50"
          fontWeight="600"
          fontSize="14px"
          color="gray.800"
        >
          我的订阅
          <Text
            display="inline"
            color="grayAlternatives.300"
            ml="12px"
            fontSize="12px"
          >
            IDC b1会议室所有设备IDC b1会议室所有设备IDC b1会议室所有设备IDC
            b1会议室所有设备...
          </Text>
        </Flex>
        <Flex
          padding="0 20"
          color="grayAlternatives.300"
          height="40px"
          alignItems="center"
          fontSize="12px"
        >
          <Box color="gray.700">
            订阅设备：
            <Text display="inline" color="primary">
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
