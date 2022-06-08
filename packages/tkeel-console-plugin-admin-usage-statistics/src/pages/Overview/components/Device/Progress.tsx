import type { BoxProps } from '@chakra-ui/react';
import { Box, HStack } from '@chakra-ui/react';

interface Props extends BoxProps {
  total?: number;
  value?: number;

  valueColor?: string;

  restColor?: string;
  height?: string;
}

export default function Progress({
  total = 100,
  value = 0,
  valueColor = 'green.300',
  restColor = 'gray.400',
  height = '4px',
}: Props) {
  return (
    <HStack spacing="1px">
      <Box
        width={`${(value * 100) / total}%`}
        height={height}
        backgroundColor={valueColor}
      />
      <Box flex="1" height={height} backgroundColor={restColor} />
    </HStack>
  );
}
