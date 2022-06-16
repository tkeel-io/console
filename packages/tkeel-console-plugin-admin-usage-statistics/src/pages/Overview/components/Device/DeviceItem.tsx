import type { StyleProps } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { numeral } from '@tkeel/console-utils';

interface Props {
  label: ReactNode;
  value: ReactNode;
  subValue?: ReactNode;
  valueFormatter?: boolean | string;
  subValueFormatter?: boolean | string;
  sx?: StyleProps;
}

export default function DeviceItem({
  label,
  value,
  subValue,
  valueFormatter = true,
  subValueFormatter = true,
  sx,
}: Props) {
  return (
    <Box {...sx}>
      <Box
        paddingBottom="8px"
        fontSize="14px"
        lineHeight="16px"
        color="gray.500"
      >
        {label}
      </Box>
      <Flex alignItems="baseline">
        <Box
          fontWeight="500"
          fontSize="24px"
          lineHeight="24px"
          color="gray.700"
        >
          {numeral.formatReactNode({ input: value, formatter: valueFormatter })}
        </Box>
        {subValue && (
          <Box
            paddingLeft="4px"
            fontSize="14px"
            lineHeight="20px"
            color="gray.500"
          >
            {numeral.formatReactNode({
              input: subValue,
              formatter: subValueFormatter,
            })}
          </Box>
        )}
      </Flex>
    </Box>
  );
}
