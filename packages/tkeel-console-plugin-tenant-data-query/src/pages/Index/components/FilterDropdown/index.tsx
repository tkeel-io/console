import { Flex, StyleProps } from '@chakra-ui/react';
import { useState } from 'react';

import useDeviceGroupQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceGroupQuery';
import useDeviceListQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceListQuery';
import useDeviceTemplatesQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceTemplatesQuery';
import {
  DEVICE_GROUP_ID,
  DEVICE_TEMPLATES_ID,
} from '@/tkeel-console-plugin-tenant-data-query/pages/Index/constants';

import FilterConditionSelect from './FilterConditionSelect';
import ResultContent from './ResultContent';
import { Status } from './StatusSelect';

type Props = {
  style?: StyleProps;
  filterCondition:
    | {
        id: string;
        label: string;
      }
    | undefined;
  handleConditionClick: (condition: { id: string; label: string }) => unknown;
};

export default function FilterDropdown({
  style,
  filterCondition,
  handleConditionClick,
}: Props) {
  const [deviceId, setDeviceId] = useState('');
  const deviceGroupIdQueryField = 'sysField._spacePath';
  const [deviceListQueryConditions, setDeviceListQueryConditions] = useState([
    {
      field: deviceGroupIdQueryField,
      operator: '$wildcard',
      value: deviceId,
    },
    {
      field: 'type',
      operator: '$eq',
      value: 'device',
    },
  ]);
  const [status, setStatus] = useState({ key: 'all', value: '全部状态' });

  const baseRequestData = {
    query: '',
    page_num: 1,
    page_size: 1000,
    order_by: 'name',
    is_descending: false,
  };

  const { deviceGroupTree, isLoading: isDeviceGroupLoading } =
    useDeviceGroupQuery({
      requestData: {
        ...baseRequestData,
        condition: [
          {
            field: 'type',
            operator: '$eq',
            value: 'group',
          },
        ],
      },
    });

  const showDeviceList = !!deviceId;

  const { deviceList, isLoading: isDeviceListLoading } = useDeviceListQuery({
    requestData: {
      ...baseRequestData,
      condition: deviceListQueryConditions,
    },
    enabled: showDeviceList,
  });

  const { templates, isLoading: isDeviceTemplatesLoading } =
    useDeviceTemplatesQuery({
      requestData: {
        ...baseRequestData,
        condition: [
          {
            field: 'type',
            operator: '$eq',
            value: 'template',
          },
        ],
      },
    });
  // eslint-disable-next-line no-console
  console.log('templates', templates);
  // eslint-disable-next-line no-console
  console.log('isDeviceTemplatesLoading', isDeviceTemplatesLoading);

  const handleStatusChange = (deviceStatus: Status) => {
    let newDeviceListQueryConditions = [...deviceListQueryConditions];
    const statusQueryCondition = newDeviceListQueryConditions.find(
      (queryCondition) => queryCondition.field === '_status'
    );
    if (statusQueryCondition) {
      if (deviceStatus.key === 'all') {
        newDeviceListQueryConditions = newDeviceListQueryConditions.filter(
          (queryCondition) => queryCondition.field !== '_status'
        );
        setDeviceListQueryConditions(newDeviceListQueryConditions);
      } else {
        statusQueryCondition.value = deviceStatus.key;
        setDeviceListQueryConditions(newDeviceListQueryConditions);
      }
    } else {
      setDeviceListQueryConditions([
        ...newDeviceListQueryConditions,
        {
          field: '_status',
          operator: '$eq',
          value: deviceStatus.key,
        },
      ]);
    }
    setStatus(deviceStatus);
  };

  const handleSetDeviceId = (id: string) => {
    setDeviceId(id);
    const newDeviceListQueryConditions = [...deviceListQueryConditions];
    const typeQueryCondition = newDeviceListQueryConditions.find(
      (queryCondition) => queryCondition.field === deviceGroupIdQueryField
    );
    if (typeQueryCondition) {
      typeQueryCondition.value = id;
      setDeviceListQueryConditions(newDeviceListQueryConditions);
    }
  };

  const showDeviceGroup = filterCondition?.id === DEVICE_GROUP_ID;
  const isDeviceTemplates = filterCondition?.id === DEVICE_TEMPLATES_ID;

  // const showLoading =
  //   (showDeviceGroup && isDeviceGroupLoading) ||
  //   (showDeviceList && isDeviceListLoading);

  return (
    <Flex
      flexDirection="column"
      position="absolute"
      zIndex="2"
      padding="8px 20px 20px"
      width="100%"
      maxHeight="450px"
      backgroundColor="white"
      boxShadow="0px 8px 8px rgba(182, 194, 205, 0.2)"
      borderRadius="4px"
      {...style}
    >
      <FilterConditionSelect
        filterConditionId={filterCondition?.id ?? ''}
        handleConditionClick={handleConditionClick}
      />
      <ResultContent
        status={status}
        onStatusChange={handleStatusChange}
        isDeviceListLoading={isDeviceListLoading}
        isDeviceGroupLoading={isDeviceGroupLoading}
        showDeviceGroup={showDeviceGroup}
        deviceGroupTree={deviceGroupTree}
        setDeviceId={handleSetDeviceId}
        showDeviceList={showDeviceList}
        deviceList={deviceList}
        isDeviceTemplates={isDeviceTemplates}
      />
    </Flex>
  );
}
