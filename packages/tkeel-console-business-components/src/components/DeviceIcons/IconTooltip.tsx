import { Box, Tooltip } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  label: ReactNode;
  children: ReactNode;
};

export default function IconTooltip({ label, children }: Props) {
  return (
    <Tooltip
      label={label}
      hasArrow
      bgColor="white"
      color="gray.700"
      lineHeight="24px"
      fontSize="12px"
      p="4px 8px"
    >
      <Box>{children}</Box>
    </Tooltip>
  );
}
