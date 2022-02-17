import { useNavigate } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';
import { BackButton, MoreAction } from '@tkeel/console-components';
import { MessageWarningTwoToneIcon } from '@tkeel/console-icons';

import Table from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/Table';
import DeleteSubscriptionButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/DeleteSubscriptionButton';
import DisableButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/DisableButton';
import ModifySubscriptionButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/ModifySubscriptionButton';

function BaseInfo(name = '', value = '') {
  return (
    <Flex fontSize="12px" mb="8px">
      <Box color="grayAlternatives.300" width="100px">
        {name}
      </Box>
      <Box flex="1 " color="gray.800">
        {value}
      </Box>
    </Flex>
  );
}

function Detail(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Flex>
      <Box width="360px" mr="20px">
        <Box
          height="150px"
          background="linear-gradient(180deg, #FFFFFF 0%, #F9FBFD 100%)"
          borderRadius="4px"
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            padding="0 10px"
            paddingTop="10px"
          >
            <BackButton
              onClick={() => {
                navigate('/');
              }}
            />
            <MoreAction
              buttons={[
                <DisableButton key="disable" />,
                <ModifySubscriptionButton
                  key="modify"
                  onSuccess={() => {
                    // console.log('123');
                    // refetch();
                  }}
                />,
                <DeleteSubscriptionButton
                  key="delete"
                  id="123"
                  refetchData={() => {
                    // console.log('123');
                    // refetch();
                  }}
                />,
              ]}
            />
          </Flex>

          <Flex height="70px" align="center" padding="0 20px">
            <MessageWarningTwoToneIcon
              style={{ width: '24px', height: '22px' }}
            />
            <Box
              lineHeight="50px"
              ml="12px"
              color="gray.700"
              fontWeight="600"
              fontSize="14px"
            >
              IDC设备分组订阅
            </Box>
          </Flex>
          <Flex background="White" height="40px" alignItems="center">
            <Box fontSize="12px" color="grayAlternatives.300" padding="0 20px">
              订阅地址：
              <Text display="inline" color="gray.800">
                amqp://host:port/virtual_host
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box
          height="210px"
          mt="12px"
          background="linear-gradient(180deg, #FFFFFF 0%, #F9FBFD 100%)"
          borderRadius="4px"
          padding="12px 20px"
        >
          <Text fontWeight="600" fontSize="14px" color="gray.700" mb="12px">
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
        <Table />
      </Box>
    </Flex>
  );
}

export default Detail;
