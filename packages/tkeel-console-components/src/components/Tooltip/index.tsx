import { Box, Tooltip as ChakraTooltip } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  label: ReactNode;
  children: ReactNode;
};

export default function Tooltip({ label, children }: Props) {
  return (
    <ChakraTooltip
      label={label}
      hasArrow
      placement="top"
      bgColor="white"
      color="gray.700"
      lineHeight="24px"
      fontSize="12px"
      p="4px 8px"
    >
      <Box>{children}</Box>
    </ChakraTooltip>
  );
}
