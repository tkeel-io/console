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
  const { data } = useNetworkInfoQuery(networkId, true);
  const ip = data?.client?.client_address ?? '';
  const time = data?.client?.create_at ?? '';
  const token = data?.client?.token ?? '';
  const createTimeStamp = time
    ? formatDateTimeByTimestamp({ timestamp: `${time}` })
    : '';

  const networkBasicInfo = [
    {
      label: '客户端地址',
      value: ip,
    },
    {
      label: '认证 TOKEN',
      value: `${token.slice(0, 4)}********${token.slice(-4, token.length)}`,
    },
    {
      label: '创建时间',
      value: createTimeStamp,
    },
  ];

  return (
    <Flex height="100%">
      <Box width="360px" mr="20px">
        <BasicInfoCard data={{ ...data?.client, ip, time }} />
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
          <CopyInstallCommand copyData={data?.command ?? ''} token={token} />
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
