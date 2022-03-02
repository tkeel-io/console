import { Flex, StyleProps } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

import useDeviceGroupQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceGroupQuery';
import useDeviceListQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceListQuery';
import useDeviceTemplatesQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceTemplatesQuery';
import {
  DEVICE_GROUP_ID,
  DEVICE_TEMPLATES_ID,
} from '@/tkeel-console-plugin-tenant-data-query/pages/Index/constants';
import { RequestDataCondition } from '@/tkeel-console-plugin-tenant-data-query/types/request-data';

import FilterConditionSelect from './FilterConditionSelect';
import ResultContent from './ResultContent';
import { Status } from './StatusSelect';

type Condition = {
  id: string;
  label: string;
  value: string;
};

type Props = {
  status: Status;
  deviceGroupId: string;
  templateId: string;
  setStatus: (status: Status) => unknown;
  setDeviceGroupId: Dispatch<SetStateAction<string>>;
  setTemplateId: Dispatch<SetStateAction<string>>;
  style?: StyleProps;
  filterCondition: Condition | undefined;
  handleConditionClick: (condition: { id: string; label: string }) => unknown;
  updateCondition: (condition: { id: string; value: string }) => unknown;
};

export default function FilterDropdown({
  status,
  deviceGroupId,
  templateId,
  setStatus,
  setDeviceGroupId,
  setTemplateId,
  style,
  filterCondition,
  handleConditionClick,
  updateCondition,
}: Props) {
  // eslint-disable-next-line no-console
  console.log('templateId', templateId);
  const showDeviceGroup = filterCondition?.id === DEVICE_GROUP_ID;
  const showDeviceTemplates = filterCondition?.id === DEVICE_TEMPLATES_ID;

  const statusQueryField = 'connectInfo._online';
  const deviceGroupIdQueryField = 'sysField._spacePath';
  const templateIdQueryField = 'basicInfo.templateId';

  const defaultDeviceListQueryConditions = [
    {
      field: 'type',
      operator: '$eq',
      value: 'device',
    },
  ];

  const [deviceListQueryConditions, setDeviceListQueryConditions] = useState<
    RequestDataCondition[]
  >(defaultDeviceListQueryConditions);

  const defaultDeviceGroupConditions = useMemo(
    () => [
      {
        field: 'type',
        operator: '$eq',
        value: 'group',
      },
    ],
    []
  );

  const [deviceGroupConditions, setDeviceGroupConditions] = useState<
    RequestDataCondition[]
  >(defaultDeviceGroupConditions);

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
        query: showDeviceGroup ? filterCondition.value : '',
        condition: deviceGroupConditions,
      },
    });

  const showDeviceList =
    (showDeviceGroup || showDeviceTemplates) && !!deviceGroupId;

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
        query: showDeviceTemplates ? filterCondition.value : '',
        condition: [
          {
            field: 'type',
            operator: '$eq',
            value: 'template',
          },
        ],
      },
    });

  const handleStatusChange = (deviceStatus: Status) => {
    let newDeviceListQueryConditions = [...deviceListQueryConditions];
    const statusQueryCondition = newDeviceListQueryConditions.find(
      (queryCondition) => queryCondition.field === statusQueryField
    );

    const { value } = deviceStatus;
    const online = value === 'online';
    if (statusQueryCondition) {
      if (value === 'all') {
        newDeviceListQueryConditions = newDeviceListQueryConditions.filter(
          (queryCondition) => queryCondition.field !== statusQueryField
        );
        setDeviceListQueryConditions(newDeviceListQueryConditions);
      } else {
        statusQueryCondition.value = online;
        setDeviceListQueryConditions(newDeviceListQueryConditions);
      }
    } else {
      setDeviceListQueryConditions([
        ...newDeviceListQueryConditions,
        {
          field: statusQueryField,
          operator: '$eq',
          value: online,
        },
      ]);
    }
    setStatus(deviceStatus);
  };

  const handleSetDeviceGroupId = (groupId: string) => {
    setDeviceGroupId(groupId);
    const newDeviceListQueryConditions = [...deviceListQueryConditions];
    const groupIdCondition = newDeviceListQueryConditions.find(
      (queryCondition) => queryCondition.field === deviceGroupIdQueryField
    );
    if (groupIdCondition) {
      groupIdCondition.value = groupId;
      setDeviceListQueryConditions(newDeviceListQueryConditions);
    } else {
      setDeviceListQueryConditions([
        ...deviceListQueryConditions,
        {
          field: deviceGroupIdQueryField,
          operator: '$wildcard',
          value: groupId,
        },
      ]);
    }
  };

  const handleDeviceGroupTitleClick = ({
    groupId,
    title,
  }: {
    groupId: string;
    title: string;
  }) => {
    // eslint-disable-next-line no-console
    console.log('groupId', groupId);
    setDeviceGroupConditions([
      ...deviceGroupConditions,
      {
        field: 'group.name',
        operator: '$eq',
        value: title,
      },
    ]);
    setDeviceGroupId(groupId);

    updateCondition({ id: DEVICE_GROUP_ID, value: title });
  };

  const onTemplateClick = ({
    templateId: id,
    templateName,
  }: {
    templateId: string;
    templateName: string;
  }) => {
    setTemplateId(id);
    updateCondition({ id: DEVICE_TEMPLATES_ID, value: templateName });
    const newDeviceListQueryConditions = [...deviceListQueryConditions];
    const templateIdCondition = newDeviceListQueryConditions.find(
      (queryCondition) => queryCondition.field === templateIdQueryField
    );
    if (templateIdCondition) {
      templateIdCondition.value = id;
      setDeviceListQueryConditions(newDeviceListQueryConditions);
    } else {
      setDeviceListQueryConditions([
        ...deviceListQueryConditions,
        {
          field: templateIdQueryField,
          operator: '$wildcard',
          value: id,
        },
      ]);
    }
  };
  // const showLoading =
  //   (showDeviceGroup && isDeviceGroupLoading) ||
  //   (showDeviceList && isDeviceListLoading);

  useEffect(() => {
    const id = filterCondition?.id;
    if (!id || id !== DEVICE_GROUP_ID) {
      setDeviceGroupConditions(defaultDeviceGroupConditions);
    }
  }, [filterCondition, setDeviceGroupConditions, defaultDeviceGroupConditions]);

  // useEffect(() => {
  //   if (deviceGroupId) {
  //     console.log('set ');
  //     setDeviceListQueryConditions([
  //       ...deviceListQueryConditions,
  //       {
  //         field: deviceGroupIdQueryField,
  //         operator: '$wildcard',
  //         value: deviceGroupId,
  //       },
  //     ]);
  //   }
  // }, [deviceListQueryConditions, setDeviceListQueryConditions, deviceGroupId]);

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
        isDeviceGroupLoading={isDeviceGroupLoading}
        showDeviceGroup={showDeviceGroup}
        deviceGroupTree={deviceGroupTree}
        updateDeviceGroupId={handleSetDeviceGroupId}
        showDeviceList={showDeviceList}
        isDeviceListLoading={isDeviceListLoading}
        deviceList={deviceList}
        onTemplateClick={onTemplateClick}
        showDeviceTemplates={showDeviceTemplates}
        isDeviceTemplatesLoading={isDeviceTemplatesLoading}
        templates={templates}
        onDeviceGroupTitleClick={handleDeviceGroupTitleClick}
      />
    </Flex>
  );
}
