import type { StyleProps } from '@chakra-ui/react';
import { Box, Flex, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface Props {
  label: ReactNode;
  value: ReactNode;
  subValue?: ReactNode;
  sx?: StyleProps;
}

export default function OverviewItem({ label, value, subValue, sx }: Props) {
  return (
    <Box {...sx}>
      <Text
        paddingBottom="8px"
        fontSize="14px"
        lineHeight="16px"
        color="gray.500"
      >
        {label}
      </Text>
      <Flex alignItems="baseline">
        <Text
          fontWeight="500"
          fontSize="24px"
          lineHeight="24px"
          color="gray.700"
        >
          {value}
        </Text>
        <Text
          paddingLeft="4px"
          fontSize="14px"
          lineHeight="20px"
          color="gray.500"
        >
          {subValue}
        </Text>
      </Flex>
    </Box>
  );
}
