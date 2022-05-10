import { Box, Flex, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { CustomTab, CustomTabList, InfoCard } from '@tkeel/console-components';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import CopyInstallCommand from '@/tkeel-console-plugin-tenant-networks/components/CopyInstallCommand';
import useNetworkInfoQuery from '@/tkeel-console-plugin-tenant-networks/hooks/queries/useNetworkInfoQuery';
import BasicInfoCard from '@/tkeel-console-plugin-tenant-networks/pages/Detail/components/BasicInfoCard';
import Table from '@/tkeel-console-plugin-tenant-networks/pages/Detail/components/Table';

function Detail(): JSX.Element {
  const { id } = useParams();
  const networkId = id || '';
  // const { data, refetch } = useNetworkInfoQuery(networkId);
  const { refetch } = useNetworkInfoQuery(networkId);
  const data = {
    id: '1',
    name: '格锐芬边缘计算网关',
    status: 1,
    ip: '127.0.0.1:56091',
    token: 'sd',
    time: '2022-05-07',
  };
  const createTime = data?.time ?? '';
  const createTimeStamp = createTime
    ? formatDateTimeByTimestamp({ timestamp: `${createTime}000` })
    : '';

  const networkBasicInfo = [
    {
      label: '客户端地址',
      value: data?.ip ?? '',
    },
    {
      label: '认证 TOKEN',
      value: data?.token ?? '',
    },
    {
      label: '创建时间',
      value: createTimeStamp,
    },
  ];

  return (
    <Flex height="100%">
      <Box width="360px" mr="20px">
        <BasicInfoCard data={data} refetchData={() => refetch()} />
        <InfoCard
          title="基本信息"
          data={networkBasicInfo}
          styles={{
            wrapper: {
              marginTop: '12px',
              borderRadius: '4px',
              backgroundColor: 'white',
            },
          }}
        />
        <Box
          p="12px 20px"
          bgColor="white"
          mt="12px"
          borderRadius="4px"
          boxShadow="0px 10px 15px -3px rgba(113, 128, 150, 0.1), 0px 4px 6px -2px rgba(113, 128, 150, 0.05)"
        >
          <CopyInstallCommand copyData="乱写的" />
        </Box>
      </Box>
      <Tabs
        flex="1"
        overflowY="hidden"
        display="flex"
        flexDirection="column"
        borderRadius="4px"
      >
        <CustomTabList>
          <CustomTab borderTopLeftRadius="4px">代理服务</CustomTab>
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
            <Table id={networkId} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Detail;
