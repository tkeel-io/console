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

import type { Plugin as PluginData } from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitorPluginsQuery';
import usePluginStatusInfo from '@/tkeel-console-plugin-admin-service-monitoring/hooks/usePluginStatusInfo';

interface Props {
  data: PluginData;
  isExpanded: boolean;
}

const styles: { label: StyleProps; value: StyleProps } = {
  value: {
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '20px',
    color: 'gray.800',
  },
  label: {
    fontSize: '12px',
    lineHeight: '20px',
    color: 'grayAlternatives.300',
  },
};

export default function Plugin({ data, isExpanded }: Props) {
  // eslint-disable-next-line no-console
  console.log(isExpanded);

  const { metadata, status } = data;

  const statusInfo = usePluginStatusInfo({ status: status.status });

  return (
    <AccordionItem border="0">
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
        <Box flex="1" padding="0 16px">
          <Text {...styles.value} noOfLines={1}>
            <Tooltip label={metadata.name}>{metadata.name}</Tooltip>
          </Text>
          <Text {...styles.label} fontSize="14px">
            名称
          </Text>
        </Box>
        <Box width="180px" paddingRight="16px">
          <Flex alignItems="center">
            <Circle
              marginRight="4px"
              size="6px"
              backgroundColor={statusInfo.color}
            />
            <Text {...styles.value}>{statusInfo.label}</Text>
          </Flex>
          <Text {...styles.label}>状态</Text>
        </Box>
        <Box width="150px" paddingRight="16px">
          <Text {...styles.value}>
            {status.availableReplicas}/{status.replicas}
          </Text>
          <Text {...styles.label}>副本数量</Text>
        </Box>
        <Box width="220px" paddingRight="16px">
          <Text {...styles.value}>{metadata.name}</Text>
          <Text {...styles.label}>运行时间</Text>
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
        content
      </AccordionPanel>
    </AccordionItem>
  );
}
