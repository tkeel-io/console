import { Flex, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import {
  PageHeader,
  SegmentedControlTab,
  SegmentedControlTabList,
} from '@tkeel/console-components';
import { BellGearTwoToneIcon } from '@tkeel/console-icons';

import PolicyDetailDrawer from './components/PolicyDetailDrawer';
import PolicyTable from './components/PolicyTable';

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');
  const defaultRuleId = !!id && !Number.isNaN(Number(id)) ? Number(id) : null;
  const [ruleId, setRuleId] = useState<number | null>(defaultRuleId);
  const queryClient = useQueryClient();

  const mapTabs = [
    {
      label: '全部策略',
      key: 'all',
      component: <PolicyTable setRuleId={setRuleId} />,
    },
    {
      label: '阈值告警',
      key: 'threshold',
      component: <PolicyTable alarmRuleType={0} setRuleId={setRuleId} />,
    },
    {
      label: '系统告警',
      key: 'system',
      component: <PolicyTable alarmRuleType={1} setRuleId={setRuleId} />,
    },
  ];

  useEffect(() => {
    searchParams.delete('id');
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex paddingTop="8px" flexDirection="column" height="100%">
      <PageHeader
        icon={<BellGearTwoToneIcon />}
        name="告警策略"
        desc="告警策略配置"
        // TODO: 加文档
        // documentsPath={}
      />
      <Tabs
        isLazy
        flex="1"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
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
      {ruleId && (
        <PolicyDetailDrawer
          ruleId={ruleId}
          onClose={() => setRuleId(null)}
          refetchData={() => {
            queryClient.invalidateQueries('policyList');
          }}
        />
      )}
    </Flex>
  );
}
