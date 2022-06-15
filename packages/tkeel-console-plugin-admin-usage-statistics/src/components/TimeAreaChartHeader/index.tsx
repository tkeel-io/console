import { Flex, Text } from '@chakra-ui/react';

import { ChainFilledIcon } from '@tkeel/console-icons';

interface TimeAreaChartHeaderProps {
  title: string;
  description?: string;
}

export type { TimeAreaChartHeaderProps };

export default function TimeAreaChartHeader({
  title,
  description,
}: TimeAreaChartHeaderProps) {
  return (
    <Flex alignItems="center">
      <ChainFilledIcon />
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
