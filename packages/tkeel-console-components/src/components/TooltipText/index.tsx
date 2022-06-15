import { Box, Text, TextProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

import Tooltip from '../Tooltip';

interface Props extends TextProps {
  label: ReactNode;
}

export default function TooltipText({ label, ...rest }: Props) {
  return (
    <Box overflow="hidden">
      <Tooltip label={label}>
        <Text fontSize="12px" noOfLines={1} {...rest}>
          {label}
        </Text>
      </Tooltip>
    </Box>
  );
}
