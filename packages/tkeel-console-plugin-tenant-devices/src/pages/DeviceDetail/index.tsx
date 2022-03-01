/* eslint-disable no-underscore-dangle */
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Empty } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { WarningTwoToneIcon } from '@tkeel/console-icons';

import useDeviceDetailQuery from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery';
import useDeviceDetailSocket from '@/tkeel-console-plugin-tenant-devices/hooks/websockets/useDeviceDetailSocket';

import ConnectionInfo from './components/ConnectionInfo';
import DeviceDetailLeftPanel from './components/DeviceDetailLeftPanel';
import RawData from './components/RawData';

function Index(): JSX.Element {
  const location = useLocation();
  const { search } = location;
  const id = search.split('=')[1];
  const {
    sysField,
    basicInfo,
    connectInfo: initialConnectInfo,
  } = useDeviceDetailQuery({
    id,
  });
  const { rawData, connectInfo } = useDeviceDetailSocket({ id });
  const connectData = connectInfo || initialConnectInfo;
  const tabs = [
    {
      label: '连接信息',
      key: 'connectionInfo',
      component: <ConnectionInfo data={connectData} />,
    },
    {
      label: '原始数据',
      key: 'rawData',
      component: <RawData data={rawData} />,
    },
  ];
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };
  const warningColor = useColor('white');
  const warnTwoToneColor = useColor('grayAlternatives.200');
  const textStyle = {
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '24px',
    color: 'gray.800',
  };

  const renderRightPanel = () => {
    return (
      <Box minWidth="700px" flex="2.5" bg="white" borderRadius="4px">
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
                fontWeight="600"
                borderRight="1px"
                borderColor="gray.600"
              >
                {r.label}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabs.map((r) => (
              <TabPanel key={r.key}>
                {connectData?._online ? (
                  r.component
                ) : (
                  <Empty
                    image={
                      <WarningTwoToneIcon
                        size="32px"
                        color={warningColor}
                        twoToneColor={warnTwoToneColor}
                      />
                    }
                    title="设备处于离线状态"
                    description="详情为空,请重试链接"
                    styles={{
                      title: {
                        mt: '12px',
                        ...textStyle,
                      },
                      description: textStyle,
                      wrapper: {
                        h: '30%',
                      },
                    }}
                  />
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    );
  };

  return (
    <Flex justifyContent="space-between">
      <DeviceDetailLeftPanel
        id={id}
        sysField={sysField}
        basicInfo={basicInfo}
        connectInfo={connectData}
      />
      {renderRightPanel()}
    </Flex>
  );
}

export default Index;
