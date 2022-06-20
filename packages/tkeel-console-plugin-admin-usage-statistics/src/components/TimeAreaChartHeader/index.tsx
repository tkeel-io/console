import type { StyleProps } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/react';

import { ChainFilledIcon } from '@tkeel/console-icons';

interface TimeAreaChartHeaderProps {
  title: string;
  description?: string;
  sx?: StyleProps;
}

export type { TimeAreaChartHeaderProps };

export default function TimeAreaChartHeader({
  title,
  description,
  sx,
}: TimeAreaChartHeaderProps) {
  return (
    <Flex alignItems="center" {...sx}>
      <ChainFilledIcon size="16px" color="primary" />
      {title && (
        <Text
          paddingLeft="8px"
          fontSize="14px"
          lineHeight="20px"
          color="gray.700"
        >
          {title}
        </Text>
      )}
      {description && (
        <Text
          paddingLeft="4px"
          fontSize="12px"
          lineHeight="20px"
          color="gray.500"
        >
          {description}
        </Text>
      )}
    </Flex>
  );
}
