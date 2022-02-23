import { Box, Button, Flex, StyleProps, Text } from '@chakra-ui/react';

import DeviceGroup from './DeviceGroup';
import DeviceTemplates from './DeviceTemplates';
import Empty from './Empty';

import useDeviceGroupQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceGroupQuery';

type Props = {
  style?: StyleProps;
  filterCondition: {
    label: string;
    value: string;
  };
  handleConditionClick: (condition: string) => unknown;
};

export default function FilterDropdown({
  style,
  filterCondition,
  handleConditionClick,
}: Props) {
  const { deviceGroupTree } = useDeviceGroupQuery();

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

  const isDeviceGroup = filterCondition.label === DEVICE_GROUP_ID;
  const isDeviceTemplates = filterCondition.label === DEVICE_TEMPLATES_ID;

  return (
    <Flex
      flexDirection="column"
      position="absolute"
      zIndex="1"
      padding="8px 20px 20px"
      width="100%"
      height="450px"
      backgroundColor="white"
      boxShadow="0px 8px 8px rgba(182, 194, 205, 0.2)"
      borderRadius="4px"
      {...style}
    >
      <Text {...textStyle}>过滤条件</Text>
      <Flex marginBottom="8px">
        {conditions.map(({ id, label }) => {
          const isSelected = filterCondition.label === id;
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
              onClick={() => handleConditionClick(id)}
            >
              {label}
            </Button>
          );
        })}
      </Flex>
      <Text {...textStyle}>搜索结果</Text>
      <Box flex="1" overflow="auto">
        {!isDeviceGroup && !isDeviceTemplates && <Empty />}
        {isDeviceGroup && <DeviceGroup deviceGroupTree={deviceGroupTree} />}
        {isDeviceTemplates && <DeviceTemplates />}
      </Box>
    </Flex>
  );
}
