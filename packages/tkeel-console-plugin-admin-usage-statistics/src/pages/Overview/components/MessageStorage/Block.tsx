import type { StyleProps } from '@chakra-ui/react';
import { Box, Flex, Skeleton, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { numeral } from '@tkeel/console-utils';

interface Props {
  label: ReactNode;
  value: ReactNode;
  valueFormatter?: boolean | string;
  isLoading?: boolean;
  sx?: StyleProps;
}

const HEIGHT = '72px';

export default function Block({
  label,
  value,
  valueFormatter,
  isLoading,
  sx,
}: Props) {
  if (isLoading) {
    return <Skeleton flex="1" height={HEIGHT} />;
  }

  return (
    <Flex
      flex="1"
      alignItems="center"
      height={HEIGHT}
      padding="0 20px"
      boxShadow="4px 0px 4px rgba(239, 239, 239, 0.25)"
      backgroundColor="gray.50"
      {...sx}
    >
      <Box>
        <Text
          paddingBottom="4px"
          fontSize="12px"
          lineHeight="16px"
          color="gray.500"
        >
          {label}
        </Text>
        <Text
          fontWeight="500"
          fontSize="20px"
          lineHeight="24px"
          color="gray.700"
        >
          {numeral.formatReactNode({ input: value, formatter: valueFormatter })}
        </Text>
      </Box>
    </Flex>
  );
}
