import { Box, Button, Flex, StyleProps, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { useColor } from '@tkeel/console-hooks';
import { GoBackFilledIcon } from '@tkeel/console-icons';

// import DeviceGroup from './DeviceGroup';
import DeviceList from './DeviceList';
import DeviceTemplates from './DeviceTemplates';
import Empty from './Empty';
import StatusSelect from './StatusSelect';
// import useDeviceGroupQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceGroupQuery';

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
  // const [showDeviceList, setShowDeviceList] = useState(true);
  const [showDeviceList] = useState(true);
  const [status, setStatus] = useState('全部状态');

  // const { deviceGroupTree } = useDeviceGroupQuery();
  const primaryColor = useColor('primary');

  const textStyle = {
    marginBottom: '8px',
    color: 'grayAlternatives.300',
    fontSize: '12px',
    lineHeight: '24px',
  };

  const DEVICE_GROUP_ID = 'deviceGroup';
  const DEVICE_TEMPLATES_ID = 'deviceTemplates';
  const conditions = [
    {
      id: DEVICE_GROUP_ID,
      label: '设备分组',
    },
    {
      id: DEVICE_TEMPLATES_ID,
      label: '设备模板',
    },
  ];

  const isDeviceGroup = filterCondition?.id === DEVICE_GROUP_ID;
  const isDeviceTemplates = filterCondition?.id === DEVICE_TEMPLATES_ID;

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
      <Text {...textStyle}>过滤条件</Text>
      <Flex marginBottom="8px">
        {conditions.map((condition) => {
          const { id, label } = condition;
          const isSelected = filterCondition?.id === id;
          return (
            <Button
              marginRight="8px"
              variant="outline"
              key={id}
              borderRadius="4px"
              color={isSelected ? 'primary' : 'gray.400'}
              borderColor={isSelected ? 'primary' : 'gray.200'}
              bg={isSelected ? 'blue.50' : 'white'}
              height="24px"
              p="0 12px"
              fontSize="12px"
              onClick={() => {
                if (!isSelected) {
                  handleConditionClick(condition);
                }
              }}
            >
              {label}
            </Button>
          );
        })}
      </Flex>
      {showDeviceList ? (
        <Flex
          marginBottom="8px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex
            alignItems="center"
            color="gray.800"
            fontSize="12px"
            lineHeight="24px"
          >
            <Box
              _hover={{
                svg: {
                  color: primaryColor,
                },
              }}
            >
              <GoBackFilledIcon />
            </Box>
            <Flex marginLeft="10px">
              共
              <Text margin="0 3px" color="primary">
                23
              </Text>
              条结果
            </Flex>
          </Flex>
          <StatusSelect status={status} setStatus={setStatus} />
        </Flex>
      ) : (
        <Text {...textStyle}>搜索结果</Text>
      )}
      <Box flex="1" overflow="auto">
        {!isDeviceGroup && !isDeviceTemplates && !showDeviceList && <Empty />}
        {/* {isDeviceGroup && (
          <DeviceGroup
            deviceGroupTree={deviceGroupTree}
            onClick={() =(true)}
          />
        )} */}
        {isDeviceTemplates && <DeviceTemplates />}
        {showDeviceList && <DeviceList />}
      </Box>
    </Flex>
  );
}
