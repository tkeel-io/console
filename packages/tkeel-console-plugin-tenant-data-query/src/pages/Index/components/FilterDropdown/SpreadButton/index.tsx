import { Flex, StyleProps, Text } from '@chakra-ui/react';

import { RightFilledIcon } from '@tkeel/console-icons';

type Props = {
  style?: StyleProps;
  className?: string;
};

export default function SpreadButton({
  style,
  className = 'spread-wrapper',
}: Props) {
  return (
    <Flex
      alignItems="center"
      color="primary"
      fontSize="12px"
      className={className}
      {...style}
    >
      <Text marginRight="4px">展开</Text>
      <RightFilledIcon color="primary" />
    </Flex>
  );
}
