import { Flex, StyleProps, Text } from '@chakra-ui/react';

import { Empty, Loading } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { TelemetryFields } from '@tkeel/console-request-hooks';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import { DataItem } from '@/tkeel-console-plugin-tenant-data-query/hooks/mutations/useTelemetryDataMutation';

type Props = {
  originalData: DataItem[];
  data: DataItem[];
  isLoading: boolean;
  telemetry: TelemetryFields;
  styles?: {
    wrapper?: StyleProps;
    loading?: StyleProps;
    empty?: StyleProps;
  };
};

const getRowBackgroundColor = (index: number) => {
  return index % 2 === 0 ? 'gray.50' : 'white';
};

export default function DataTable({
  originalData,
  data,
  isLoading,
  telemetry,
  styles = {},
}: Props) {
  const originalDataKeys = Object.keys(telemetry);
  const keys = originalData[0] ? ['遥测数据', ...originalDataKeys] : [];

  data.forEach((item) => {
    const { value } = item;
    originalDataKeys.forEach((key) => {
      if (!value[key]) {
        value[key] = '-';
      }
    });
  });

  const wrapperBoxShadow = `0px 10px 15px -3px ${useColor('gray.500', 0.02)}`;
  const columnBoxShadow = `7px -4px 12px ${useColor('gray.200', 0.2)}`;

  const rowHeight = '40px';
  if (isLoading) {
    return <Loading styles={{ wrapper: styles?.loading ?? {} }} />;
  }

  if (data.length === 0) {
    return <Empty styles={{ wrapper: styles?.empty ?? {} }} />;
  }

  return (
    <Flex boxShadow={wrapperBoxShadow} {...styles.wrapper}>
      <Flex
        flexDirection="column"
        position="relative"
        zIndex="1"
        boxShadow={columnBoxShadow}
        // boxShadow="7px -4px 12px rgba(216, 222, 229, 0.4)"
      >
        {keys.map((key, i) => {
          const telemetryName = telemetry[key]?.name ?? '';
          return (
            <Text
              key={key}
              paddingLeft="12px"
              width="115px"
              height={rowHeight}
              lineHeight={rowHeight}
              color="gray.700"
              fontSize="12px"
              fontWeight="600"
              noOfLines={1}
              title={i === 0 ? '' : telemetryName}
              backgroundColor={getRowBackgroundColor(i)}
            >
              {i === 0 ? key : telemetryName}
            </Text>
          );
        })}
      </Flex>
      <Flex flex="1" overflow="auto">
        <Flex flex="1">
          {data.map((item, index) => (
            <Flex
              key={item.time}
              flex={index === data.length - 1 ? '1' : 'unset'}
              flexDirection="column"
              width="90px"
              color="gray.500"
              fontSize="12px"
            >
              <Flex
                alignItems="center"
                paddingLeft="12px"
                height={rowHeight}
                whiteSpace="pre-wrap"
                backgroundColor="gray.50"
              >
                {formatDateTimeByTimestamp({
                  timestamp: item.time,
                  template: 'MM/DD HH:mm:ss',
                }).replace(' ', '\r\n')}
              </Flex>
              {originalDataKeys.map((key, i) => (
                <Text
                  key={key}
                  paddingLeft="12px"
                  height={rowHeight}
                  lineHeight={rowHeight}
                  noOfLines={1}
                  title={String(item.value[key])}
                  backgroundColor={getRowBackgroundColor(i - 1)}
                >
                  {String(item.value[key])}
                </Text>
              ))}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
