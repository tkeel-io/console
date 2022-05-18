import {
  Box,
  Circle,
  Flex,
  StyleProps,
  Text,
  Tooltip,
  useClipboard,
} from '@chakra-ui/react';
import { ResponsiveLine } from '@nivo/line';

import { CopyButton } from '@tkeel/console-components';
import { PodTwoToneIcon } from '@tkeel/console-icons';
import { /* formatDateTimeByTimestamp, */ plugin } from '@tkeel/console-utils';

import type { MetricData } from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPodsMetricsQuery';
import type { Pod as PodData } from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPodsQuery';
import usePodStatusInfo from '@/tkeel-console-plugin-admin-service-monitoring/hooks/usePodStatusInfo';

import * as defaultStyles from '../Plugin/styles';

interface Props {
  data: PodData;
  metrics: {
    cpu: MetricData;
    memory: MetricData;
  };
  styles?: {
    root?: StyleProps;
  };
}

export default function Pod({ data, metrics, styles }: Props) {
  const toast = plugin.getPortalToast();
  const { metadata, spec, status } = data;
  const nodeText = `${spec.nodeName}（${status.hostIP}）`;

  const statusInfo = usePodStatusInfo({ status: status.phase });

  const { hasCopied, onCopy } = useClipboard(metadata.name);
  if (hasCopied) {
    toast('复制成功', { status: 'success' });
  }

  const { cpu, memory } = metrics;
  const { values: cpuValues } = cpu;
  const { values: memoryValues } = memory;
  const cpuData = [
    {
      id: 'cpu',
      data: cpuValues.map(([timestamp, value]) => ({
        x: timestamp,
        y: value,
      })),
    },
  ];
  const memoryData = [
    {
      id: 'cpu',
      data: memoryValues.map(([timestamp, value]) => ({
        x: timestamp,
        y: value,
      })),
    },
  ];

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
      <Box marginRight="40px">
        <Text {...defaultStyles.value}>{status.podIP}</Text>
        <Text {...defaultStyles.label}>容器组 IP</Text>
      </Box>
      <Box marginRight="40px" width="140px">
        <Flex>
          <Text
            fontWeight="600"
            fontSize="12px"
            lineHeight="20px"
            color="grayAlternatives.300"
          >
            CPU
          </Text>
          <Text
            paddingLeft="4px"
            fontWeight="600"
            fontSize="12px"
            lineHeight="20px"
          >
            123
          </Text>
        </Flex>
        <Box height="20px">
          <ResponsiveLine data={cpuData} />
        </Box>
      </Box>
      <Box marginRight="40px" width="140px">
        <Flex>
          <Text
            fontWeight="600"
            fontSize="12px"
            lineHeight="20px"
            color="grayAlternatives.300"
          >
            内存
          </Text>
          <Text
            paddingLeft="4px"
            fontWeight="600"
            fontSize="12px"
            lineHeight="20px"
          >
            123
          </Text>
        </Flex>
        <Box height="20px">
          <ResponsiveLine data={memoryData} />
        </Box>
      </Box>
    </Flex>
  );
}
