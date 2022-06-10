import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { numeral } from '@tkeel/console-utils';

interface Props {
  summary: {
    name: string;
    value: number;
    valueFormatter?: boolean | string;
    unit: string;
  };
  children: ReactNode;
}

export default function ChartContainer({ summary, children }: Props) {
  return (
    <Flex flexDirection="column" padding="16px 16px 0">
      <HStack alignItems="center" spacing="4px">
        <Text fontSize="12px" lineHeight="20px" color="gray.700">
          {summary.name}
        </Text>
        <Text
          fontWeight="500"
          fontSize="14px"
          lineHeight="20px"
          color="gray.700"
        >
          {numeral.formatReactNode({
            input: summary.value,
            formatter: summary.valueFormatter,
          })}
        </Text>
        <Text fontSize="12px" lineHeight="20px" color="gray.500">
          {summary.unit}
        </Text>
      </HStack>
      <Box flex="1">{children}</Box>
    </Flex>
  );
}
