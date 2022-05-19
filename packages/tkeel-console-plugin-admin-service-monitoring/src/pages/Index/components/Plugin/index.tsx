import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Circle,
  Flex,
  StyleProps,
  Text,
  Tooltip,
} from '@chakra-ui/react';

import { AppsTwoToneIcon4 } from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import type { Plugin as PluginData } from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitoringPluginsQuery';
import usePluginStatusInfo from '@/tkeel-console-plugin-admin-service-monitoring/hooks/usePluginStatusInfo';
import type { PluginStatus } from '@/tkeel-console-plugin-admin-service-monitoring/types';

import Pods from '../Pods';
import * as defaultStyles from './styles';

interface Props {
  data: PluginData;
  statusValue: PluginStatus | undefined;
  isExpanded: boolean;
  styles?: {
    root?: StyleProps;
  };
}

export default function Plugin({
  data,
  statusValue,
  isExpanded,
  styles,
}: Props) {
  const { metadata, status } = data;

  const statusInfo = usePluginStatusInfo({
    status: statusValue as PluginStatus,
  });

  return (
    <AccordionItem border="0" {...styles?.root}>
      <AccordionButton
        border="1px solid"
        borderColor="grayAlternatives.100"
        borderRadius="4px"
        padding="16px 24px"
        backgroundColor="white"
        textAlign="left"
        _hover={{
          '&': {
            borderColor: 'gray.700',
            backgroundColor: 'gray.50',
          },
        }}
        _focus={{ '&': { boxShadow: 'none' } }}
        _expanded={{
          '&': {
            borderColor: 'gray.700',
            boxShadow:
              '0px 10px 15px -3px rgba(113, 128, 150, 0.1), 0px 4px 6px -2px rgba(113, 128, 150, 0.05)',
          },
        }}
      >
        <AppsTwoToneIcon4 size="32px" />
        <Box flex="1" margin="0 120px 0 16px">
          <Text {...defaultStyles.value} noOfLines={1}>
            <Tooltip label={metadata.name}>{metadata.name}</Tooltip>
          </Text>
          <Text {...defaultStyles.label} fontSize="14px">
            名称
          </Text>
        </Box>
        <Box marginRight="120px">
          <Flex alignItems="center">
            <Circle
              marginRight="4px"
              size="6px"
              backgroundColor={statusInfo.color}
            />
            <Text {...defaultStyles.value}>{statusInfo.label}</Text>
          </Flex>
          <Text {...defaultStyles.label}>状态</Text>
        </Box>
        <Box marginRight="120px">
          <Text {...defaultStyles.value}>
            {status.availableReplicas}/{status.replicas}
          </Text>
          <Text {...defaultStyles.label}>副本数量</Text>
        </Box>
        <Box marginRight="120px">
          <Text {...defaultStyles.value}>
            {formatDateTimeByTimestamp({ timestamp: status.updateTime })}
          </Text>
          <Text {...defaultStyles.label}>更新时间</Text>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel
        marginTop="12px"
        padding="16px 20px"
        border="1px solid"
        borderColor="grayAlternatives.100"
        borderRadius="4px"
        backgroundColor="gary.50"
      >
        {isExpanded && <Pods pluginData={data} />}
      </AccordionPanel>
    </AccordionItem>
  );
}
