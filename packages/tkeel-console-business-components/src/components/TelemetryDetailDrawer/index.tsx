import {
  Box,
  Center,
  Flex,
  HStack,
  Spacer,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

import { AceEditor, Drawer } from '@tkeel/console-components';
import { WebcamTwoToneIcon } from '@tkeel/console-icons';
import { TelemetryItem } from '@tkeel/console-types/src/types/device';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

interface TelemetryTableItem extends TelemetryItem {
  value?: string | number | boolean;
}

type Props = {
  telemetryInfo: TelemetryTableItem;
  isOpen: boolean;
  onClose: () => void;
};
const defineType = {
  default_value: '默认值',
  rw: '读写',
  max: '最大值',
  min: '最小值',
  '0': '0',
  '1': '1',
  length: '长度',
  step: '步长',
  unit: '单位',
};

function getDetailData(data: TelemetryTableItem) {
  return [
    { label: '遥测ID', value: data.id },
    { label: '遥测值', value: data.value || '-' },
    {
      label: '时间戳',
      value: formatDateTimeByTimestamp({ timestamp: data.last_time }),
    },
    { label: '数据类型', value: data.type },
    ...Object.entries(defineType)
      .filter((v) => !!data?.define?.[v[0]])
      .map((item) => {
        const key = item[0];
        const label = item[1];
        return {
          label,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value: data.define[key],
        };
      }),
  ];
}
function getJsonString(data: unknown) {
  try {
    return JSON.stringify(data, null, '\t');
  } catch {
    return '';
  }
}
export default function TelemetryDetailDrawer({
  telemetryInfo,
  isOpen,
  onClose,
}: Props) {
  const { name, description } = telemetryInfo;
  const detailData = getDetailData(telemetryInfo);
  const [isJson, setIsJson] = useState(false);
  return (
    <Drawer title={`遥测「${name}」详情`} isOpen={isOpen} onClose={onClose}>
      <HStack
        p="18px 24px"
        spacing="20px"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor="grayAlternatives.50"
      >
        <Center w="76px" h="76px" bg="gray.50" borderRadius="50%">
          <WebcamTwoToneIcon size="27px" />
        </Center>
        <VStack spacing="4px" align="stretch">
          <Text fontSize="16px" lineHeight="24px" fontWeight="500">
            {name}
          </Text>
          <Text
            fontWeight="400"
            fontSize="12px"
            lineHeight="24px"
            color="grayAlternatives.300"
          >
            {description || '暂无描述'}
          </Text>
        </VStack>
      </HStack>
      <Box p="24px">
        <Flex align="center" h="24px" mb="10px">
          <Text lineHeight="24px" fontWeight="400" fontSize="14px">
            基本信息
          </Text>
          <Spacer />
          <HStack>
            <Switch
              size="sm"
              colorScheme="brand"
              isChecked={isJson}
              onChange={(e) => {
                setIsJson(e.target.checked);
              }}
            />
            <Text fontSize="12px" color="gray.500" lineHeight="24px">
              json格式
            </Text>
          </HStack>
        </Flex>
        {!isJson ? (
          <Box p="16px 24px" bg="gray.50">
            {detailData.map((item) => (
              <Flex
                align="flex-start"
                flexDir="row"
                key={item.label}
                fontSize="12px"
                lineHeight="24px"
              >
                <Text width="80px" color="grayAlternatives.300">
                  {item.label}
                </Text>
                <Text flex="1" color="gray.700">
                  {item.value}
                </Text>
              </Flex>
            ))}
          </Box>
        ) : (
          <AceEditor height="400px" value={getJsonString(telemetryInfo)} />
        )}
      </Box>
    </Drawer>
  );
}
