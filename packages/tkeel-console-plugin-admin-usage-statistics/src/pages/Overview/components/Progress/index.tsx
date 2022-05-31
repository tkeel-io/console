import type { BoxProps } from '@chakra-ui/react';
import { Box, HStack } from '@chakra-ui/react';

interface Props extends BoxProps {
  total: number;
  value?: number;

  valueColor?: string;

  restColor?: string;
  height?: string;
}

export default function Progress({
  total,
  value = 0,
  valueColor = 'primary',
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
