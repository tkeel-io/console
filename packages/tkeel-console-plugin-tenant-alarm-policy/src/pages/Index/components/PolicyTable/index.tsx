import { Box, Flex, Text } from '@chakra-ui/react';
import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { CellProps, Column } from 'react-table';

import {
  AlarmLevelSelect,
  AlarmLevelTag,
  AlarmLevelTips,
  AlarmRuleTypeTag,
  AlarmTypeSelect,
} from '@tkeel/console-business-components';
import {
  Badge,
  PageHeaderToolbar,
  Table,
  Tooltip,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { MailFilledIcon } from '@tkeel/console-icons';
import {
  AlarmLevel,
  AlarmRuleType,
  AlarmType,
  RuleStatus,
} from '@tkeel/console-types';

import {
  ALARM_SOURCE_OBJECT_MAP,
  ALARM_TYPE_MAP,
} from '@/tkeel-console-plugin-tenant-alarm-policy/constants';
import type {
  Policy,
  RequestParams as usePolicyListQueryProps,
} from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';
import usePolicyListQuery from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';

import ConfigureNotificationModal from '../ConfigureNotificationModal';
import CreatePolicyButton from '../CreatePolicyButton';
import PolicyMoreAction from '../PolicyMoreAction';
import PolicyStatus from '../PolicyStatus';
import RuleStatusSelect from '../RuleStatusSelect';

interface Props {
  alarmRuleType?: AlarmRuleType;
  setRuleId: Dispatch<SetStateAction<number | null>>;
}

function PolicyTable({ alarmRuleType, setRuleId }: Props) {
  const [keywords, setKeywords] = useState('');
  const [alarmLevel, setAlarmLevel] = useState<AlarmLevel>();
  const [alarmType, setAlarmType] = useState<AlarmType>();
  const [ruleStatus, setRuleStatus] = useState<RuleStatus>();
  const [id, setId] = useState<number | null>();
  const [noticeId, setNoticeId] = useState<string | null>(null);
  const [isShowLoading, setIsShowLoading] = useState(false);

  const pagination = usePagination();
  const { pageNum, pageSize, setPageNum, setTotalSize } = pagination;

  const params: usePolicyListQueryProps = {
    alarmRuleType,
    alarmLevel,
    alarmType,
    enable: ruleStatus,
    ruleName: keywords,
    pageNum,
    pageSize,
  };

  const { policyList, total, isLoading, isSuccess, refetch } =
    usePolicyListQuery({
      params,
      onSuccess() {
        setIsShowLoading(false);
      },
    });
  if (isSuccess) {
    setTotalSize(total);
  }

  const columns: ReadonlyArray<Column<Policy>> = [
    {
      Header: (
        <Flex>
          <Text marginRight="2px">级别</Text>
          <AlarmLevelTips />
        </Flex>
      ),
      accessor: 'alarmLevel',
      Cell: useCallback(
        ({ value }: CellProps<Policy, Policy['alarmLevel']>) => {
          return <AlarmLevelTag level={value} />;
        },
        []
      ),
    },
    {
      Header: '告警策略类型',
      accessor: 'alarmRuleType',
      Cell: useCallback(
        ({ value }: CellProps<Policy, Policy['alarmRuleType']>) => (
          <AlarmRuleTypeTag type={value} />
        ),
        []
      ),
    },
    {
      Header: '告警策略名称',
      accessor: 'ruleName',
      Cell: useCallback(
        ({ value, row }: CellProps<Policy, Policy['ruleName']>) => (
          // TODO: count 指定为接口返回的数量
          <Badge count={1} dot>
            <Text
              fontWeight="500"
              cursor="pointer"
              onClick={() => setRuleId(row.original.ruleId)}
            >
              {value}
            </Text>
          </Badge>
        ),
        [setRuleId]
      ),
    },
    {
      Header: '告警源对象',
      accessor: 'alarmSourceObject',
      Cell: useCallback(
        ({ value }: CellProps<Policy, Policy['alarmSourceObject']>) => (
          <Box>{ALARM_SOURCE_OBJECT_MAP[value] || ''}</Box>
        ),
        []
      ),
    },
    {
      Header: '规则描述',
      accessor: 'ruleDesc',
      Cell: useCallback(
        ({ value }: CellProps<Policy, Policy['ruleDesc']>) => (
          <Tooltip label={value}>
            <Text noOfLines={1}>{value}</Text>
          </Tooltip>
        ),
        []
      ),
    },
    {
      Header: '告警类型',
      accessor: 'alarmType',
      Cell: useCallback(
        ({ value }: CellProps<Policy, Policy['alarmType']>) => (
          <Box>{ALARM_TYPE_MAP[value] || ''}</Box>
        ),
        []
      ),
    },
    {
      Header: '通知配置',
      accessor: 'noticeId',
      Cell: useCallback(({ value, row }: CellProps<Policy, string>) => {
        return (
          <MailFilledIcon
            onClick={() => {
              setId(row.original.ruleId);
              setNoticeId(row.original.noticeId);
            }}
            color={value ? 'primary' : 'gray.300'}
            style={{ marginLeft: '10px', cursor: 'pointer' }}
          />
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []),
    },
    {
      Header: '状态',
      accessor: 'enable',
      Cell: useCallback(
        ({ value, row }: CellProps<Policy, RuleStatus>) => (
          <PolicyStatus
            status={value}
            ruleId={row.original.ruleId}
            onSuccess={() => {
              refetch();
            }}
          />
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
      ),
    },
    {
      Header: '操作',
      width: 80,
      Cell: useCallback(({ row }: CellProps<Policy>) => {
        const { original } = row;

        return (
          <PolicyMoreAction
            policy={original}
            onSuccess={() => refetch()}
            setRuleId={setRuleId}
          />
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []),
    },
  ];

  useEffect(() => {
    setIsShowLoading(isLoading);
  }, [isLoading]);

  return (
    <Flex height="100%" flexDirection="column">
      <PageHeaderToolbar
        selectElements={[
          <AlarmLevelSelect
            key="alarmLevel"
            onChange={(level) => {
              setAlarmLevel(level === -1 ? undefined : level);
            }}
          />,
          <AlarmTypeSelect
            key="alarmType"
            onChange={(type) => {
              setAlarmType(type === -1 ? undefined : type);
            }}
            styles={{ wrapper: { marginLeft: '12px' } }}
          />,
          <RuleStatusSelect
            key="ruleStatus"
            onChange={(status) => {
              setRuleStatus(status === -1 ? undefined : status);
            }}
          />,
        ]}
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
            setPageNum(1);
            setKeywords(value);
          },
        }}
        hasRefreshIcon
        onRefresh={() => {
          setIsShowLoading(true);
          refetch();
        }}
        buttons={[
          <CreatePolicyButton key="create" onSuccess={() => refetch()} />,
        ]}
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
        data={policyList}
        paginationProps={pagination}
        scroll={{ y: '100%' }}
        isLoading={isShowLoading}
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
      {id !== null && (
        <ConfigureNotificationModal
          ruleId={id}
          noticeId={noticeId || ''}
          isOpen={!!id}
          onClose={() => setId(null)}
          onSuccess={() => refetch()}
        />
      )}
    </Flex>
  );
}

export default memo(PolicyTable);
