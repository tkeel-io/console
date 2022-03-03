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
  type: 'index' | 'searchResult';
  status: Status;
  // deviceGroupId: string;
  // templateId: string;
  showDeviceList: boolean;
  setStatus: (status: Status) => unknown;
  setDeviceGroupId: Dispatch<SetStateAction<string>>;
  setTemplateId: Dispatch<SetStateAction<string>>;
  style?: StyleProps;
  filterConditions: Condition[];
  handleConditionClick: (condition: { id: string; label: string }) => unknown;
  updateCondition: (condition: { id: string; value: string }) => unknown;
  setShowDeviceList: Dispatch<SetStateAction<boolean>>;
  hideFilterDropdown: () => unknown;
};

export default function FilterDropdown({
  type,
  status,
  // deviceGroupId,
  // templateId,
  showDeviceList,
  setStatus,
  setDeviceGroupId,
  setTemplateId,
  style,
  filterConditions,
  handleConditionClick,
  updateCondition,
  setShowDeviceList,
  hideFilterDropdown,
}: Props) {
  const isIndex = type === 'index';
  const sysFieldId = 'sysField._id';
  const groupIdFilterCondition = filterConditions.find(
    (condition) => condition.id === DEVICE_GROUP_ID
  );
  const templateIdFilterCondition = filterConditions.find(
    (condition) => condition.id === DEVICE_TEMPLATES_ID
  );
  const keywordsCondition = filterConditions.find(
    (condition) => condition.id === 'keywords'
  );
  const showDeviceGroup = !!groupIdFilterCondition;
  const showDeviceTemplates = !!templateIdFilterCondition;

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

  const defaultTemplateConditions = useMemo(
    () => [
      {
        field: 'type',
        operator: '$eq',
        value: 'template',
      },
    ],
    []
  );

  const [templateConditions, setTemplateConditions] = useState<
    RequestDataCondition[]
  >(defaultTemplateConditions);

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
        query: showDeviceGroup ? groupIdFilterCondition.value : '',
        condition: deviceGroupConditions,
      },
    });

  // const showDeviceList = Boolean(
  //   (showDeviceGroup && deviceGroupId) ||
  //     (showDeviceTemplates && templateId) ||
  //     keywordsCondition
  // );

  const { deviceList, isLoading: isDeviceListLoading } = useDeviceListQuery({
    requestData: {
      ...baseRequestData,
      query: keywordsCondition?.value ?? '',
      condition: deviceListQueryConditions,
    },
    enabled: showDeviceList,
  });

  const { templates, isLoading: isDeviceTemplatesLoading } =
    useDeviceTemplatesQuery({
      requestData: {
        ...baseRequestData,
        query: showDeviceTemplates ? templateIdFilterCondition.value : '',
        condition: templateConditions,
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

  const handleDeviceGroupTitleClick = ({
    groupId,
    title,
  }: {
    groupId: string;
    title: string;
  }) => {
    if (isIndex) {
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

      setDeviceGroupConditions([
        ...deviceGroupConditions,
        {
          field: sysFieldId,
          operator: '$eq',
          value: groupId,
        },
      ]);

      setShowDeviceList(true);
    } else {
      hideFilterDropdown();
    }

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
    if (isIndex) {
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

      setTemplateConditions([
        ...templateConditions,
        {
          field: sysFieldId,
          operator: '$eq',
          value: id,
        },
      ]);

      setShowDeviceList(true);
    } else {
      hideFilterDropdown();
    }

    setTemplateId(id);
    updateCondition({ id: DEVICE_TEMPLATES_ID, value: templateName });
  };
  // const showLoading =
  //   (showDeviceGroup && isDeviceGroupLoading) ||
  //   (showDeviceList && isDeviceListLoading);

  useEffect(() => {
    const groupId = groupIdFilterCondition?.id;
    if (!groupId || groupId !== DEVICE_GROUP_ID) {
      setDeviceGroupConditions(defaultDeviceGroupConditions);
    }
  }, [
    groupIdFilterCondition,
    setDeviceGroupConditions,
    defaultDeviceGroupConditions,
  ]);

  useEffect(() => {
    const templateConditionId = templateIdFilterCondition?.id;
    if (!templateConditionId || templateConditionId !== DEVICE_GROUP_ID) {
      setTemplateConditions(defaultTemplateConditions);
    }
  }, [
    templateIdFilterCondition,
    setTemplateConditions,
    defaultTemplateConditions,
  ]);

  // const handleUpdateDeviceGroupConditions = useCallback(
  //   (groupId: string) => {
  //     setDeviceGroupConditions([
  //       ...deviceGroupConditions,
  //       {
  //         field: sysFieldId,
  //         operator: '$eq',
  //         value: groupId,
  //       },
  //     ]);
  //   },
  //   [setDeviceGroupConditions, deviceGroupConditions]
  // );

  // useEffect(() => {
  //   handleUpdateDeviceGroupConditions(deviceGroupId);
  // }, [deviceGroupId, handleUpdateDeviceGroupConditions]);

  // useEffect(() => {
  //   if (deviceGroupId) {
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
        disabled={
          !groupIdFilterCondition &&
          !templateIdFilterCondition &&
          !!keywordsCondition
        }
        filterConditionId={
          groupIdFilterCondition?.id || templateIdFilterCondition?.id || ''
        }
        handleConditionClick={handleConditionClick}
      />
      <ResultContent
        status={status}
        onStatusChange={handleStatusChange}
        isDeviceGroupLoading={isDeviceGroupLoading}
        showDeviceGroup={showDeviceGroup}
        deviceGroupTree={deviceGroupTree}
        // clearDeviceGroupId={() => setDeviceGroupId('')}
        // clearTemplateId={() => setTemplateId('')}
        showBackButton={Boolean(
          groupIdFilterCondition || templateIdFilterCondition
        )}
        showDeviceList={showDeviceList}
        isDeviceListLoading={isDeviceListLoading}
        deviceList={deviceList}
        setShowDeviceList={setShowDeviceList}
        onTemplateClick={onTemplateClick}
        showDeviceTemplates={showDeviceTemplates}
        isDeviceTemplatesLoading={isDeviceTemplatesLoading}
        templates={templates}
        onDeviceGroupTitleClick={handleDeviceGroupTitleClick}
      />
    </Flex>
  );
}
