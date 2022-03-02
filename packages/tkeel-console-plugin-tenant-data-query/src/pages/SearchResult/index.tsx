import { Flex, Grid, Text } from '@chakra-ui/react';
// import { Base64 } from 'js-base64';
import { useSearchParams } from 'react-router-dom';

import { PageHeaderToolbar } from '@tkeel/console-components';

import DeviceInfoCard from '@/tkeel-console-plugin-tenant-data-query/components/DeviceInfoCard';
import useDeviceListQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceListQuery';
import SearchDeviceInput from '@/tkeel-console-plugin-tenant-data-query/pages/Index/components/SearchDeviceInput';
import {
  DEVICE_GROUP_ID,
  DEVICE_TEMPLATES_ID,
} from '@/tkeel-console-plugin-tenant-data-query/pages/Index/constants';
import { RequestDataCondition } from '@/tkeel-console-plugin-tenant-data-query/types/request-data';

export default function SearchResult() {
  const [searchParams] = useSearchParams();

  const baseRequestData = {
    query: '',
    page_num: 1,
    page_size: 1000,
    order_by: 'name',
    is_descending: false,
  };
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

  const keywords = searchParams.get('keywords') || '';

  const { deviceList, isLoading } = useDeviceListQuery({
    requestData: {
      ...baseRequestData,
      query: keywords,
      condition: conditions,
    },
  });

  // eslint-disable-next-line no-console
  console.log('SearchResult ~ isLoading', isLoading);
  const defaultFilterConditions = [];

  const groupName = decodeURIComponent(searchParams.get('group-name') || '');
  const templateName = decodeURIComponent(
    searchParams.get('template-name') || ''
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
      id: 'keywords',
      label: '关键字',
      value: keywords,
    });
  }

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
        />
      </Flex>
      <Flex marginTop="16px" fontSize="12px" color="gray.800" lineHeight="24px">
        共
        <Text margin="0 3px" color="primary">
          23
        </Text>
        条结果
      </Flex>
      <Grid
        marginTop="12px"
        flex="1"
        overflow="auto"
        templateColumns="repeat(4, 1fr)"
        gap="8px"
        overflowY="auto"
      >
        {deviceList.map((device) => (
          <DeviceInfoCard key={device.id} device={device} />
        ))}
      </Grid>
    </Flex>
  );
}
