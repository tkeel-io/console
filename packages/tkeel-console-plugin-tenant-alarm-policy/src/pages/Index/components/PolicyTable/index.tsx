import { Box, Flex, Switch, Text } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { CellProps, Column } from 'react-table';

import {
  AlarmLevelSelect,
  AlarmLevelTag,
} from '@tkeel/console-business-components';
import {
  MoreAction,
  PageHeaderToolbar,
  Table,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';

import DeletePolicyButton from '@/tkeel-console-plugin-tenant-alarm-policy/components/DeletePolicyButton';
import ModifyPolicyButton from '@/tkeel-console-plugin-tenant-alarm-policy/components/ModifyPolicyButton';
import {
  ALARM_RULE_TYPE_MAP,
  ALARM_TYPE_MAP,
  RULE_STATUS_MAP,
} from '@/tkeel-console-plugin-tenant-alarm-policy/constants';
import type {
  AlarmLevel,
  AlarmRuleType,
  AlarmType,
  Policy,
} from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';

import CreatePolicyButton from '../CreatePolicyButton';
import ViewPolicyDetailButton from '../ViewPolicyDetailButton';
import mockPolicyData from './mockPolicyData';

export default function PolicyTable() {
  const [keywords, setKeywords] = useState('');
  const [alarmLevel, setAlarmLevel] = useState<number>();
  // eslint-disable-next-line no-console
  console.log('PolicyTable ~ alarmLevel', alarmLevel);
  // eslint-disable-next-line no-console
  console.log('PolicyTable ~ keywords', keywords);
  const pagination = usePagination();

  const columns: ReadonlyArray<Column<Policy>> = [
    {
      Header: '级别',
      accessor: 'alarmLevel',
      Cell: useCallback(
        ({ value }: CellProps<Policy, AlarmLevel>) => (
          <AlarmLevelTag level={value} />
        ),
        []
      ),
    },
    {
      Header: '告警策略类型',
      accessor: 'alarmRuleType',
      Cell: useCallback(
        ({ value }: CellProps<Policy, AlarmRuleType>) => (
          <Box>{ALARM_RULE_TYPE_MAP[value] || ''}</Box>
        ),
        []
      ),
    },
    {
      Header: '告警策略名称',
      accessor: 'ruleName',
    },
    {
      Header: '告警源对象',
      accessor: 'alarmSourceObject',
    },
    {
      Header: '规则描述',
      accessor: 'ruleDesc',
    },
    {
      Header: '告警类型',
      accessor: 'alarmType',
      Cell: useCallback(
        ({ value }: CellProps<Policy, AlarmType>) => (
          <Box>{ALARM_TYPE_MAP[value] || ''}</Box>
        ),
        []
      ),
    },
    {
      Header: '通知配置',
      Cell: useCallback(() => {
        return <Flex>通知配置 icon</Flex>;
      }, []),
    },
    {
      Header: '状态',
      accessor: 'enable',
      Cell: useCallback(
        ({ value }: CellProps<Policy, AlarmRuleType>) => (
          <Flex alignItems="center">
            <Switch size="sm" />
            <Text marginLeft="8px" color="gray.700" fontSize="12px">
              {RULE_STATUS_MAP[value] || ''}
            </Text>
          </Flex>
        ),
        []
      ),
    },
    {
      Header: '操作',
      width: 80,
      Cell: useCallback(({ row }: CellProps<Policy>) => {
        const { original } = row;

        return (
          <MoreAction
            styles={{ actionList: { width: '124px' } }}
            buttons={[
              <ModifyPolicyButton key="modify" />,
              <ViewPolicyDetailButton policy={original} key="viewDetail" />,
              <DeletePolicyButton
                key="delete"
                policy={original}
                onSuccess={() => {}}
              />,
            ]}
          />
        );
      }, []),
    },
  ];

  return (
    <Flex height="100%" flexDirection="column">
      <PageHeaderToolbar
        name={
          <Flex>
            <AlarmLevelSelect onChange={setAlarmLevel} />
          </Flex>
        }
        hasSearchInput
        searchInputProps={{
          placeholder: '支持搜索告警策略名称',
          inputGroupStyle: {
            flex: '1',
          },
          inputStyle: {
            backgroundColor: 'gray.50',
          },
          onSearch(value) {
            // setPageNum(1);
            setKeywords(value);
          },
        }}
        buttons={[<CreatePolicyButton key="create" />]}
        styles={{
          wrapper: {
            zIndex: 1,
            padding: '0 20px',
            backgroundColor: 'gray.100',
          },
        }}
      />
      <Table
        columns={columns}
        data={mockPolicyData}
        paginationProps={pagination}
        scroll={{ y: '100%' }}
        isLoading={false}
        styles={{
          wrapper: {
            flex: 1,
            overflow: 'hidden',
            backgroundColor: 'whiteAlias',
          },
          headTr: {
            height: '40px',
            backgroundColor: 'gray.50',
          },
          pagination: {
            padding: '0 20px',
            backgroundColor: 'gray.50',
          },
        }}
      />
    </Flex>
  );
}
