import { Flex, StyleProps } from '@chakra-ui/react';

import { Empty, Loading } from '@tkeel/console-components';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import { DataItem } from '@/tkeel-console-plugin-tenant-data-query/hooks/mutations/useTelemetryDataMutation';
import { Telemetry } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceDetailQuery';

type Props = {
  originalData: DataItem[];
  data: DataItem[];
  isLoading: boolean;
  telemetry: Telemetry;
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
  const keys = originalData[0]
    ? ['遥测数据', ...Object.keys(originalData[0]?.value ?? {})]
    : [];
  const rowHeight = '40px';
  if (isLoading) {
    return <Loading styles={{ wrapper: styles?.loading ?? {} }} />;
  }

  if (data.length === 0) {
    return <Empty styles={{ wrapper: styles?.empty ?? {} }} />;
  }

  return (
    <Flex {...styles.wrapper}>
      <Flex
        flexDirection="column"
        position="relative"
        zIndex="1"
        boxShadow="7px 0px 12px rgba(216, 222, 229, 0.4)"
      >
        {keys.map((key, i) => (
          <Flex
            key={key}
            alignItems="center"
            paddingLeft="12px"
            width="130px"
            height={rowHeight}
            color="gray.700"
            fontSize="12px"
            fontWeight="600"
            backgroundColor={getRowBackgroundColor(i)}
          >
            {i === 0 ? key : telemetry[key]?.name}
          </Flex>
        ))}
      </Flex>
      <Flex flex="1" overflow="auto">
        <Flex>
          {data.map((item) => (
            <Flex
              key={item.time}
              flexDirection="column"
              width="100px"
              color="gray.500"
              fontSize="12px"
            >
              <Flex
                alignItems="center"
                paddingLeft="10px"
                height={rowHeight}
                whiteSpace="pre-wrap"
                backgroundColor="gray.50"
              >
                {formatDateTimeByTimestamp({
                  timestamp: item.time,
                  template: 'MM/DD HH:mm:ss',
                }).replace(' ', '\r\n')}
              </Flex>
              {Object.keys(item.value).map((key, i) => (
                <Flex
                  key={key}
                  paddingLeft="10px"
                  height={rowHeight}
                  alignItems="center"
                  backgroundColor={getRowBackgroundColor(i - 1)}
                >
                  {String(item.value[key])}
                </Flex>
              ))}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
