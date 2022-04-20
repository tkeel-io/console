import { Flex, Text } from '@chakra-ui/react';

import { Tooltip } from '@tkeel/console-components';
import { RightFilledIcon } from '@tkeel/console-icons';

type Props = {
  title: string;
};

export default function ConfigButton({ title }: Props) {
  return (
    <Tooltip label="敬请期待">
      <Flex
        justifyContent="center"
        alignItems="center"
        width="124px"
        height="40px"
        borderRadius="4px"
        backgroundColor="gray.50"
        cursor="not-allowed"
      >
        <Text color="grayAlternatives.200" fontSize="12px">
          {title}
        </Text>
        <RightFilledIcon
          color="grayAlternatives.200"
          style={{ marginLeft: '8px' }}
        />
      </Flex>
    </Tooltip>
  );
}
