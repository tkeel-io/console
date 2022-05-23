import {
  Box,
  Circle,
  Flex,
  StyleProps,
  Text,
  Tooltip,
  useClipboard,
} from '@chakra-ui/react';
import numeral from 'numeral';

import { CopyButton } from '@tkeel/console-components';
import { PodTwoToneIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import type { MetricData } from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPodsMetricsQuery';
import type { Pod as PodData } from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPodsQuery';
import usePodStatusInfo from '@/tkeel-console-plugin-admin-service-monitoring/hooks/usePodStatusInfo';

import AreaChart from '../AreaChart';
import * as defaultStyles from '../Plugin/styles';

function formatCPUValue(value: number | string) {
  return `${Number(value) * 1000} m`;
}

function formatMemoryValue(value: number | string) {
  return numeral(value).format('0.00 ib');
}

function getData(values: [number, string][]) {
  return values.map(([timestamp, value]) => ({
    x: timestamp,
    y: Number(value),
  }));
}

const NO_DATA_MESSAGE = '未发现监控数据';

interface Props {
  data: PodData;
  metrics: {
    cpu?: MetricData;
    memory?: MetricData;
  };
  styles?: {
    root?: StyleProps;
  };
}

export default function Pod({ data, metrics, styles }: Props) {
  // const { colors }: Theme = useTheme();
  const toast = plugin.getPortalToast();
  const { metadata, spec, status } = data;
  const nodeText = `${spec.nodeName}（${status.hostIP}）`;

  const statusInfo = usePodStatusInfo({ status: status.phase });

  const { hasCopied, onCopy } = useClipboard(metadata.name);
  if (hasCopied) {
    toast('复制成功', { status: 'success' });
  }

  const { cpu, memory } = metrics;
  const cpuValues = cpu?.values ?? [];
  const memoryValues = memory?.values ?? [];
  const { length: cpuValuesCount } = cpuValues;
  const { length: memoryValuesCount } = memoryValues;

  const cpuData = getData(cpuValues);
  const memoryData = getData(memoryValues);
  const latestCpuValue =
    cpuValuesCount > 0 ? cpuValues[cpuValuesCount - 1][1] : '';
  const latestMemoryValue =
    memoryValuesCount > 0 ? memoryValues[memoryValuesCount - 1][1] : '';

  return (
    <Flex
      alignItems="center"
      padding="16px 24px"
      border="1px solid"
      borderColor="grayAlternatives.100"
      borderRadius="4px"
      backgroundColor="white"
      {...styles?.root}
    >
      <PodTwoToneIcon size="32px" />
      <Box flex="1" margin="0 80px 0 12px">
        <Flex alignItems="center">
          <Text {...defaultStyles.value} noOfLines={1}>
            <Tooltip label={metadata.name}>{metadata.name}</Tooltip>
          </Text>
          <CopyButton display="none" onClick={onCopy} />
        </Flex>
        <Flex align="center">
          <Box position="relative" width="10px" height="10px">
            <Circle
              position="absolute"
              top="0"
              right="0"
              bottom="0"
              left="0"
              size="10px"
              backgroundColor={statusInfo.color}
              opacity="0.2"
            />
            <Circle
              position="absolute"
              top="2px"
              right="2px"
              bottom="2px"
              left="2px"
              size="6px"
              backgroundColor={statusInfo.color}
              boxShadow={statusInfo.boxShadow}
            />
          </Box>
          <Text {...defaultStyles.label} paddingLeft="2px">
            {statusInfo.label}
          </Text>
        </Flex>
      </Box>
      <Box marginRight="40px" flex="1">
        <Text {...defaultStyles.value} noOfLines={1}>
          <Tooltip label={nodeText}>{nodeText}</Tooltip>
        </Text>
        <Text {...defaultStyles.label}>节点</Text>
      </Box>
      <Box marginRight="60px" width="140px">
        <Text {...defaultStyles.value}>{status.podIP}</Text>
        <Text {...defaultStyles.label}>容器组 IP</Text>
      </Box>
      {[
        {
          key: 'cpu',
          label: 'CPU',
          formattedLatestValue: formatCPUValue(latestCpuValue),
          valuesCount: cpuValuesCount,
          chart: <AreaChart data={cpuData} yFormatter={formatCPUValue} />,
        },
        {
          key: 'memory',
          label: '内存',
          formattedLatestValue: formatMemoryValue(latestMemoryValue),
          valuesCount: memoryValuesCount,
          chart: <AreaChart data={memoryData} yFormatter={formatMemoryValue} />,
        },
      ].map(({ key, label, formattedLatestValue, valuesCount, chart }) => (
        <Box key={key} marginRight="60px" width="140px">
          <Flex>
            <Text
              fontWeight="600"
              fontSize="12px"
              lineHeight="20px"
              color="grayAlternatives.300"
            >
              {label}
            </Text>
            <Text
              paddingLeft="4px"
              fontWeight="600"
              fontSize="12px"
              lineHeight="20px"
              color="gray.700"
            >
              {formattedLatestValue}
            </Text>
          </Flex>
          <Box height="20px">
            {valuesCount > 0 ? (
              chart
            ) : (
              <Text fontSize="12px" lineHeight="20px" color="gray.500">
                {NO_DATA_MESSAGE}
              </Text>
            )}
          </Box>
        </Box>
      ))}
    </Flex>
  );
}
