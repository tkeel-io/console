import type { StyleProps } from '@chakra-ui/react';
import { HStack, Text } from '@chakra-ui/react';

import { numeral } from '@tkeel/console-utils';

interface Props {
  name: string;
  value: number;
  valueFormatter?: boolean | string;
  unit: string;
  sx?: StyleProps;
}

export default function ChartHeader({
  name,
  value,
  valueFormatter,
  unit,
  sx,
}: Props) {
  return (
    <HStack alignItems="center" spacing="4px" {...sx}>
      <Text fontSize="12px" lineHeight="20px" color="gray.700">
        {name}
      </Text>
      <Text fontWeight="500" fontSize="14px" lineHeight="20px" color="gray.700">
        {numeral.formatReactNode({
          input: value,
          formatter: valueFormatter,
        })}
      </Text>
      <Text fontSize="12px" lineHeight="20px" color="gray.500">
        {unit}
      </Text>
    </HStack>
  );
}
