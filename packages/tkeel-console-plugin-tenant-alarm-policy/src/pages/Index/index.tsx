import { Flex, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import {
  PageHeader,
  SegmentedControlTab,
  SegmentedControlTabList,
} from '@tkeel/console-components';
import { BellGearTwoToneIcon } from '@tkeel/console-icons';

import PolicyTable from './components/PolicyTable';

export default function Index() {
  const mapTabs = [
    {
      label: '全部策略',
      key: 'all',
      component: <PolicyTable />,
    },
    {
      label: '阈值告警',
      key: 'threshold',
      component: <PolicyTable />,
    },
    {
      label: '系统告警',
      key: 'system',
      component: <PolicyTable />,
    },
  ];

  return (
    <Flex paddingTop="8px" flexDirection="column" height="100%">
      <PageHeader
        icon={<BellGearTwoToneIcon />}
        name="告警策略"
        desc="告警策略配置"
      />
      <Tabs flex="1" display="flex" flexDirection="column">
        <SegmentedControlTabList
          sx={{ margin: '10px 0', width: 'max-content' }}
        >
          {mapTabs.map((item) => (
            <SegmentedControlTab key={item.key}>
              {item.label}
            </SegmentedControlTab>
          ))}
        </SegmentedControlTabList>
        <TabPanels flex="1" overflow="hidden" bg="gray.50">
          {mapTabs.map((item) => (
            <TabPanel key={item.key} padding="0">
              {item.component}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
