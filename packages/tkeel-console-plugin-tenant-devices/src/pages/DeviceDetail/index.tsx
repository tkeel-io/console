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
} from '@chakra-ui/react';

import ConnectionInfo from './components/ConnectionInfo';
import DeviceDetailLeftPanel from './components/DeviceDetailLeftPanel';
import InitialData from './components/InitialData';

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

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (index: number) => {
    setTabIndex(index);
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
      <DeviceDetailLeftPanel id={id} />
      {renderRightPanel()}
    </Flex>
  );
}

export default Index;
