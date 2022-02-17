/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BranchTowToneIcon, DotLineFilledIcon } from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import ConnectionInfo from './components/ConnectionInfo';
import DeviceBasicInfoCard, { Basic } from './components/DeviceBasicInfoCard';
import DeviceInfoCard from './components/DeviceInfoCard';
import InitialData from './components/InitialData';
import { InfoCardWrapper } from './index.style';

import useDeviceDetailQuery from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery';
import { selfLearnColor } from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/constants';

const tabs = [
  {
    label: '连接信息',
    key: 'connectionInfo',
    component: <ConnectionInfo />,
  },
  {
    label: '原始数据',
    key: 'initialData',
    component: <InitialData />,
  },
];

function Index(): JSX.Element {
  const location = useLocation();
  const { search } = location;
  const id = search.split('=')[1];
  const { sysField, basicInfo } = useDeviceDetailQuery({
    id,
  });

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  const renderLeftPanel = () => {
    const basic: Basic[] = [
      {
        content: sysField?._id || '',
        hasIcon: false,
        label: '设备ID',
        render: () => '',
      },
      {
        content: '',
        hasIcon: false,
        label: '设备凭证',
        render: () => {
          const str = sysField?._token;
          if (!str) return '';
          return `${str.slice(0, 4)}*******${str.slice(-5, -1)}`;
        },
      },
      {
        content: basicInfo?.parentId || '',
        hasIcon: false,
        label: '设备组',
        render: () => '',
      },
      {
        content: '',
        hasIcon: true,
        render() {
          return basicInfo?.directConnection ? (
            <DotLineFilledIcon />
          ) : (
            <BranchTowToneIcon />
          );
        },
        label: '连接方式',
      },
      {
        content: '',
        hasIcon: false,
        render() {
          return formatDateTimeByTimestamp({
            timestamp: sysField?._createdAt,
          });
        },
        label: '创建时间',
      },
      {
        content: '',
        hasIcon: false,
        label: '更新时间',
        render() {
          return formatDateTimeByTimestamp({
            timestamp: sysField?._updatedAt,
          });
        },
      },
      {
        content: basicInfo?.description || '',
        hasIcon: false,
        label: '描述',
        render: () => '',
      },
    ];
    const status = sysField?._status ?? 'offline';
    const selfLearn = basicInfo?.selfLearn
      ? selfLearnColor[1]
      : selfLearnColor[0];
    return (
      <VStack spacing="12px" minWidth="360px" flex={1} mr="20px">
        <DeviceInfoCard
          selfLearn={selfLearn}
          isSelfLearn={basicInfo?.selfLearn}
          status={status}
        />
        <DeviceBasicInfoCard
          isDirectConnection={basicInfo?.directConnection}
          basic={basic}
        />
        <InfoCardWrapper>
          <Text fontSize="14px" fontWeight={600} mb="12px">
            扩展信息
          </Text>
          {Object.keys(basicInfo?.ext || {}).map((r) => {
            return (
              <Flex fontSize="12px" key={r}>
                <Text
                  minWidth="48px"
                  h="24px"
                  lineHeight="24px"
                  mr="26px"
                  color="grayAlternatives.300"
                >
                  {basicInfo?.ext[r].name as string}
                </Text>
                <Text
                  h="20px"
                  lineHeight="24px"
                  color="gray.800"
                  fontWeight={400}
                >
                  {basicInfo?.ext[r].value as string}
                </Text>
              </Flex>
            );
          })}
        </InfoCardWrapper>
        )
      </VStack>
    );
  };

  const renderRightPanel = () => {
    return (
      <Box minWidth="700px" flex="2.67" bg="white" borderRadius="4px">
        <Tabs variant="unstyled" index={tabIndex} onChange={handleTabChange}>
          <TabList
            bg="gray.700"
            color="white"
            borderRadius={tabIndex === 0 ? '4px 4px 0 0' : '0 4px 0 0'}
          >
            {tabs.map((r) => (
              <Tab
                key={r.key}
                _selected={{
                  color: 'white',
                  bg: 'primary',
                  borderRadius: `${tabIndex === 0 ? '4px' : 0} 0 0 0`,
                  boxShadow: 'none',
                }}
                fontSize="12px"
                fontWeight={600}
                borderRight="1px"
                borderColor="gray.600"
              >
                {r.label}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabs.map((r) => (
              <TabPanel key={r.key}>{r.component}</TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    );
  };

  return (
    <Flex justifyContent="space-between">
      {renderLeftPanel()}
      {renderRightPanel()}
    </Flex>
  );
}

export default Index;
