import type { StyleProps } from '@chakra-ui/react';
import { Box, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface Props {
  label: ReactNode;
  value: ReactNode;
  sx?: StyleProps;
}

export default function Block({ label, value, sx }: Props) {
  return (
    <Box
      flex="1"
      padding="14px 20px"
      boxShadow="4px 0px 4px rgba(239, 239, 239, 0.25)"
      backgroundColor="gray.50"
      {...sx}
    >
      <Text
        paddingBottom="4px"
        fontSize="12px"
        lineHeight="16px"
        color="gray.500"
      >
        {label}
      </Text>
      <Text fontWeight="500" fontSize="20px" lineHeight="24px" color="gray.700">
        {value}
      </Text>
    </Box>
  );
}
