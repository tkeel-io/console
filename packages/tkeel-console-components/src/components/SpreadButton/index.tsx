import { Flex, StyleProps, Text } from '@chakra-ui/react';

import { RightFilledIcon } from '@tkeel/console-icons';

type Props = {
  sx?: StyleProps;
  styles?: {
    root?: StyleProps;
  };
  className?: string;
};

export default function SpreadButton({
  sx,
  styles,
  className = 'spread-wrapper',
}: Props) {
  return (
    <Flex
      alignItems="center"
      color="primary"
      fontSize="12px"
      className={className}
      {...sx}
      {...styles?.root}
    >
      <Text marginRight="4px">展开</Text>
      <RightFilledIcon color="primary" />
    </Flex>
  );
}
