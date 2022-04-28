import { Box, Flex, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { CustomTab, CustomTabList, InfoCard } from '@tkeel/console-components';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import useSubscribeInfoQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useSubscribeInfoQuery';
import Table from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/Table';

import BasicInfoCard from './components/BasicInfoCard';

function Detail(): JSX.Element {
  const { id } = useParams();
  const subscribeId = id || '';
  const { data, refetch } = useSubscribeInfoQuery(subscribeId);

  const createTime = data?.created_at ?? '';
  const createTimeStamp = createTime
    ? formatDateTimeByTimestamp({ timestamp: `${createTime}000` })
    : '';

  const subscribeBasicInfo = [
    {
      label: '订阅ID',
      value: data?.id ?? '',
    },
    {
      label: '订阅数量',
      value: (
        <Box fontSize="12px" color="grayAlternatives.300">
          <Text fontSize="12px" color="primary" display="inline" mr="2px">
            {data?.count ?? 0}
          </Text>
          台设备
        </Box>
      ),
    },
    {
      label: '创建时间',
      value: createTimeStamp,
    },
    {
      label: '描述',
      value: data?.description ?? '',
    },
  ];

  return (
    <Flex height="100%">
      <Box width="360px" mr="20px">
        <BasicInfoCard data={data} refetchData={() => refetch()} />
        <InfoCard
          title="基本信息"
          data={subscribeBasicInfo}
          styles={{
            wrapper: {
              marginTop: '12px',
              borderRadius: '4px',
              backgroundColor: 'white',
            },
          }}
        />
      </Box>
      <Tabs
        flex="1"
        overflowY="hidden"
        display="flex"
        flexDirection="column"
        borderRadius="4px"
      >
        <CustomTabList>
          <CustomTab borderTopLeftRadius="4px">订阅设备</CustomTab>
        </CustomTabList>
        <TabPanels
          flex="1"
          overflowY="auto"
          boxShadow="0px 10px 15px -3px rgba(113, 128, 150, 0.1), 0px 4px 6px -2px rgba(113, 128, 150, 0.05)"
        >
          <TabPanel
            height="100%"
            padding="0"
            borderBottomLeftRadius="4px"
            borderBottomRightRadius="4px"
            backgroundColor="white"
          >
            <Table
              id={subscribeId}
              title={data?.title ?? ''}
              refetchSubscribeInfo={() => refetch()}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Detail;
