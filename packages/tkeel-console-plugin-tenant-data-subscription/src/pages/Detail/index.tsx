import { Box, Flex, Tabs, Text, TabPanel, TabPanels } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  BackButton,
  CustomTab,
  CustomTabList,
  InfoCard,
  MoreAction,
} from '@tkeel/console-components';
import { MessageWarningTwoToneIcon } from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import useSubscribeInfoQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useSubscribeInfoQuery';
import Table from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/Table';
import DeleteSubscriptionButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/DeleteSubscriptionButton';
import ModifySubscriptionButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/ModifySubscriptionButton';

function Detail(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname }: { pathname: string } = location;
  const ID = pathname.split('/')[pathname.split('/').length - 1];
  const { data, isSuccess, refetch } = useSubscribeInfoQuery(ID);
  const defaultValues = {
    description: data?.description,
    endpoint: data?.endpoint,
    id: data?.id,
    title: data?.title,
    is_default: data?.is_default,
  };
  // const created_at = data.created_at
  // console.log('data', data);

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
            {isSuccess && (
              <MoreAction
                buttons={[
                  <ModifySubscriptionButton
                    key="modify"
                    data={defaultValues}
                    onSuccess={() => {
                      refetch();
                    }}
                  />,
                  <DeleteSubscriptionButton
                    key="delete"
                    id={data?.id}
                    name={data?.title}
                    refetchData={() => {
                      navigate('/');
                      // refetch();
                    }}
                  />,
                ]}
              />
            )}
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
              {data?.title}
            </Box>
          </Flex>
          <Flex background="white" height="40px" alignItems="center">
            <Box fontSize="12px" color="grayAlternatives.300" padding="0 20px">
              订阅地址
              <Text display="inline" color="gray.800" ml="26px">
                {data?.endpoint}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box
          mt="12px"
          background="linear-gradient(180deg, #FFFFFF 0%, #F9FBFD 100%)"
        >
          <InfoCard
            title="基本信息"
            data={[
              {
                label: '订阅ID',
                value: data?.id,
              },
              {
                label: '订阅数量',
                value: (
                  <Box fontSize="12px" color="grayAlternatives.300">
                    <Text
                      fontSize="12px"
                      color="primary"
                      display="inline"
                      mr="2px"
                    >
                      {data?.count}
                    </Text>
                    台设备
                  </Box>
                ),
              },
              {
                label: '创建时间',
                value: formatDateTimeByTimestamp({
                  timestamp: `${data?.created_at}000`,
                }),
              },
              {
                label: '描述',
                value: data?.description,
              },
            ]}
          />
        </Box>
      </Box>
      <Box flex="1" borderRadius="4px">
        <Tabs display="flex" flexDirection="column" flex="1">
          <CustomTabList>
            <CustomTab>订阅设备</CustomTab>
          </CustomTabList>

          <TabPanels borderBottomLeftRadius="4px" borderBottomRightRadius="4px">
            <TabPanel height="100%" padding="0" backgroundColor="white">
              <Table id={ID} title={data?.title} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}

export default Detail;
