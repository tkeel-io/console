import { Flex, Text } from '@chakra-ui/react';
import Dot from 'packages/tkeel-console-plugin-tenant-alarms/src/components/Dot';
import Tag from 'packages/tkeel-console-plugin-tenant-alarms/src/components/Tag';
import {
  ALARMS_LEVEL,
  ALARMS_POLICY,
  ALARMS_STATUS,
  ALARMS_TYPES,
  MOCK_DATA,
} from 'packages/tkeel-console-plugin-tenant-alarms/src/constants';
import { Item } from 'packages/tkeel-console-plugin-tenant-alarms/src/types';
import { useMemo } from 'react'; // useCallback useState
import { CellProps, Column } from 'react-table';

import {
  MoreAction,
  Table,
  // Tooltip,
} from '@tkeel/console-components';

import DisposeAlarmButton from '../DisposeAlarmButton';
import ShowDetailButton from '../ShowDetailButton';
import Filter from '../TableFilter';

function AlarmsTable() {
  const columns: ReadonlyArray<Column<Item>> = [
    {
      Header: '级别',
      accessor: 'level',
      width: 60,
      Cell: ({ row }: CellProps<Item>) =>
        useMemo(() => {
          const { original } = row;
          const { level } = original;
          const tagInfo = ALARMS_LEVEL[level] || ALARMS_LEVEL[1];

          return <Tag {...tagInfo} />;
        }, [row]),
    },
    {
      Header: '告警策略类型',
      width: 80,
      accessor: 'alarm_rule_type',
      Cell: ({ row }: CellProps<Item>) =>
        useMemo(() => {
          const { original } = row;
          const { alarm_rule_type: type } = original;
          const tagInfo = ALARMS_POLICY[type] || ALARMS_POLICY[0];
          return <Tag borderRadius="2px" {...tagInfo} />;
        }, [row]),
    },
    {
      Header: '告警源对象',
      width: 100,
      accessor: 'source',
    },
    {
      Header: '告警描述',
      accessor: 'desc',
    },
    {
      Header: '告警类型',
      width: 65,
      accessor: 'type',
      Cell: ({ row }: CellProps<Item>) =>
        useMemo(() => {
          const { original } = row;
          const { type } = original;

          return <Text>{ALARMS_TYPES[type]}</Text>;
        }, [row]),
    },
    {
      Header: '时间',
      width: 100,
      accessor: 'create_time',
    },
    {
      Header: '状态',
      width: 60,
      accessor: 'status',
      Cell: ({ row }: CellProps<Item>) =>
        useMemo(() => {
          const { original } = row;
          const { status = 0 } = original;
          const { color, label } = ALARMS_STATUS[status];

          return (
            <Flex align="center" gap="4px">
              <Dot color={color} size="6px" />
              {label}
            </Flex>
          );
        }, [row]),
    },
    {
      Header: '操作',
      width: 80,
      Cell: () =>
        useMemo(() => {
          return (
            <MoreAction
              buttons={[
                <DisposeAlarmButton key="1" />,
                <ShowDetailButton key="2" />,
              ]}
            />
          );
        }, []),
    },
  ];

  return (
    <>
      <Filter />
      <Table
        columns={columns}
        data={MOCK_DATA}
        scroll={{ y: '100%' }}
        // paginationProps={pagination}
        // isLoading={isLoading}
        styles={{
          wrapper: {
            flex: 1,
            overflow: 'hidden',
            backgroundColor: 'whiteAlias',
          },
        }}
      />
    </>
  );
}

export default AlarmsTable;
