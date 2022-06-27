import { Box, Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ALARMS_TYPES } from 'packages/tkeel-console-plugin-tenant-alarms/src/constants';
import type {
  AlarmItem as Item,
  AlarmLevel,
  AlarmPolicyType,
  AlarmStatus,
  AlarmType,
  RequestParams,
} from 'packages/tkeel-console-plugin-tenant-alarms/src/types';
import { useCallback, useMemo, useState } from 'react';
import { CellProps, Column } from 'react-table';

import {
  AlarmLevelTag,
  AlarmLevelTips,
  AlarmRuleTypeTag,
} from '@tkeel/console-business-components';
import { MoreAction, Table } from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { ComputingLampTwoToneIcon } from '@tkeel/console-icons';

// import AlarmPolicyTypeTag from '@/tkeel-console-plugin-tenant-alarms/components/AlarmPolicyTypeTag';
import AlarmStatusTag from '@/tkeel-console-plugin-tenant-alarms/components/AlarmStatusTag';
import AlarmContext from '@/tkeel-console-plugin-tenant-alarms/context/alarm';
import useAlarmListQuery from '@/tkeel-console-plugin-tenant-alarms/hooks/queries/useAlarmListQuery';

import DisposeAlarmButton from '../DisposeAlarmButton';
import ShowDetailButton from '../ShowDetailButton';
import Filter from '../TableFilter';

function AlarmsTable() {
  const pagination = usePagination();
  const [params, setParams] = useState<
    Omit<RequestParams, 'pageNum' | 'pageSize'>
  >({});
  const { pageNum, pageSize, setTotalSize } = pagination;

  const { list, total, isLoading, isSuccess, refetch } = useAlarmListQuery({
    pageSize,
    pageNum,
    ...params,
  });

  if (isSuccess) {
    setTotalSize(total);
  }

  const columns: ReadonlyArray<Column<Item>> = [
    {
      Header: (
        <Flex>
          <Text marginRight="2px">级别</Text>
          <AlarmLevelTips />
        </Flex>
      ),
      accessor: 'alarmLevel',
      width: 60,
      Cell: useCallback(
        ({ value }: CellProps<Item, AlarmLevel>) => (
          <AlarmLevelTag level={value} />
        ),
        []
      ),
    },
    {
      Header: '告警策略类型',
      width: 80,
      accessor: 'alarmStrategy',
      Cell: useCallback(({ value }: CellProps<Item, AlarmPolicyType>) => {
        return <AlarmRuleTypeTag type={value} />;
      }, []),
    },
    {
      Header: '告警源对象',
      width: 100,
      accessor: 'alarmSource',
      Cell: useCallback(({ value, row }: CellProps<Item, AlarmType>) => {
        const { deviceId } = row.original;
        return (
          <Box>
            {value === 1 ? (
              <Flex alignItems="center">
                <ComputingLampTwoToneIcon />
                <Text ml="4px">{deviceId}</Text>
              </Flex>
            ) : (
              '平台'
            )}
          </Box>
        );
      }, []),
    },
    {
      Header: '告警描述',
      accessor: 'alarmDesc',
    },
    {
      Header: '告警类型',
      width: 65,
      accessor: 'alarmType',
      Cell: useCallback(({ value }: CellProps<Item, AlarmType>) => {
        return <Text>{ALARMS_TYPES[value] || ''}</Text>;
      }, []),
    },
    {
      Header: '时间',
      width: 100,
      accessor: 'startTime',
      Cell: useCallback(
        ({ value }: CellProps<Item, number>) => (
          <Text>{dayjs(value * 1000).format('YYYY-MM-DD HH:mm:ss')}</Text>
        ),
        []
      ),
    },
    {
      Header: '状态',
      width: 60,
      accessor: 'alarmStatus',
      Cell: useCallback(
        ({ value }: CellProps<Item, AlarmStatus>) => (
          <AlarmStatusTag status={value} />
        ),
        []
      ),
    },
    {
      Header: '操作',
      width: 50,
      // accessor: 'alarmId',
      Cell: useCallback(({ row }: CellProps<Item, number>) => {
        const { original } = row;
        const { alarmId, ruleId } = original;

        return (
          <MoreAction
            key={alarmId}
            buttons={[
              <DisposeAlarmButton
                key={alarmId}
                alarmId={alarmId}
                ruleId={ruleId}
              />,
              <ShowDetailButton key={ruleId} details={original} />,
            ]}
          />
        );
      }, []),
    },
  ];

  const store = useMemo(
    () => ({
      refetch,
    }),
    [refetch]
  );

  return (
    <AlarmContext.Provider value={store}>
      <Flex flex="1" direction="column" overflow="hidden" mt="16px !important">
        <Filter
          onChange={(p) =>
            setParams((r) => {
              const param = { ...r, ...p };
              Object.entries(param).forEach(([key, value]) => {
                if (value === -1) {
                  delete param[key];
                }
              });
              return param;
            })
          }
        />
        <Table
          columns={columns}
          data={list}
          // scroll={{ y: '100%' }}
          paginationProps={pagination}
          isLoading={isLoading}
          styles={{
            wrapper: {
              flex: 1,
              overflow: 'auto',
              backgroundColor: 'whiteAlias',
            },
            body: {
              overflow: 'auto',
            },
            pagination: {
              px: '20px',
            },
          }}
        />
      </Flex>
    </AlarmContext.Provider>
  );
}

export default AlarmsTable;
