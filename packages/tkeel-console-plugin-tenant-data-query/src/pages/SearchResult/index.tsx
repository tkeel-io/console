import { Flex, Text } from '@chakra-ui/react';
import { Base64 } from 'js-base64';
import { useSearchParams } from 'react-router-dom';

import { PageHeaderToolbar } from '@tkeel/console-components';

import {
  Status,
  StatusSelect,
} from '@/tkeel-console-plugin-tenant-data-query/components';
import DeviceInfoCard from '@/tkeel-console-plugin-tenant-data-query/components/DeviceInfoCard';
import useDeviceListQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceListQuery';
import SearchDeviceInput from '@/tkeel-console-plugin-tenant-data-query/pages/Index/components/SearchDeviceInput';
import { FilterConditionIds } from '@/tkeel-console-plugin-tenant-data-query/pages/Index/constants';
import { RequestDataCondition } from '@/tkeel-console-plugin-tenant-data-query/types/request-data';

const { DEVICE_GROUP_ID, DEVICE_TEMPLATES_ID, KEYWORDS } = FilterConditionIds;

export default function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();

  const baseRequestData = {
    query: '',
    page_num: 1,
    page_size: 1000,
    order_by: 'name',
    is_descending: false,
  };
  // const statusQueryField = 'sysField._status';
  const statusQueryField = 'connectInfo._online';
  const deviceGroupIdQueryField = 'sysField._spacePath';
  const templateIdQueryField = 'basicInfo.templateId';

  const conditions: RequestDataCondition[] = [
    {
      field: 'type',
      operator: '$eq',
      value: 'device',
    },
  ];

  const groupId = searchParams.get('group-id');
  if (groupId) {
    conditions.push({
      field: deviceGroupIdQueryField,
      operator: '$wildcard',
      value: groupId,
    });
  }

  const templateId = searchParams.get('template-id');
  if (templateId) {
    conditions.push({
      field: templateIdQueryField,
      operator: '$wildcard',
      value: templateId,
    });
  }

  const status = searchParams.get('status') || '';
  if (['online', 'offline'].includes(status)) {
    conditions.push({
      field: statusQueryField,
      operator: '$eq',
      value: status === 'online',
    });
  }

  let statusLabel = '全部状态';
  if (status === 'online') {
    statusLabel = '在线';
  } else if (status === 'offline') {
    statusLabel = '离线';
  }
  const deviceStatusInfo = {
    label: statusLabel,
    value: status,
  };

  const keywords = searchParams.get('keywords') || '';

  const { deviceList, data, isLoading, refetch } = useDeviceListQuery({
    requestData: {
      ...baseRequestData,
      query: keywords,
      condition: conditions,
    },
    enabled: conditions.length > 0,
  });

  // eslint-disable-next-line no-console
  console.log('SearchResult ~ isLoading', isLoading);
  const defaultFilterConditions = [];

  const groupName = decodeURIComponent(
    Base64.decode(searchParams.get('group-name') || '')
  );
  const templateName = decodeURIComponent(
    Base64.decode(searchParams.get('template-name') || '')
  );
  if (groupName) {
    defaultFilterConditions.push({
      id: DEVICE_GROUP_ID,
      label: '设备分组',
      value: groupName,
    });
  } else if (templateName) {
    defaultFilterConditions.push({
      id: DEVICE_TEMPLATES_ID,
      label: '设备模板',
      value: templateName,
    });
  }
  if (keywords) {
    defaultFilterConditions.push({
      id: KEYWORDS,
      label: '关键字',
      value: keywords,
    });
  }

  const handleStatusChange = (statusInfo: Status) => {
    searchParams.set('status', statusInfo.value);
    if (groupId || templateId || keywords) {
      setSearchParams(searchParams);
    }
  };

  return (
    <Flex height="100%" flexDirection="column">
      <Flex justifyContent="flex-start" alignItems="center">
        <PageHeaderToolbar
          name="数据查询"
          hasIcon
          styles={{ wrapper: { width: 'auto' } }}
        />
        <SearchDeviceInput
          defaultFilterConditions={defaultFilterConditions}
          style={{ marginLeft: '19%' }}
          type="searchResult"
          refetchData={() => {
            refetch();
          }}
        />
      </Flex>
      <Flex marginTop="16px" justifyContent="space-between">
        <Flex color="gray.800" fontSize="12px" lineHeight="24px">
          共
          <Text margin="0 3px" color="primary">
            {data?.listDeviceObject?.total ?? 0}
          </Text>
          条结果
        </Flex>
        <StatusSelect
          status={deviceStatusInfo}
          onStatusChange={handleStatusChange}
          canHover={false}
        />
      </Flex>
      <Flex marginTop="12px" flex="1">
        <Flex marginRight="-8px" width="100%">
          {deviceList.map((device) => (
            <DeviceInfoCard
              key={device.id}
              device={device}
              style={{ marginRight: '8px', marginBottom: '12px', width: '25%' }}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
