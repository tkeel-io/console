import { Flex, Text } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

import { Tooltip } from '@tkeel/console-components';
import { RightFilledIcon } from '@tkeel/console-icons';

type Props = {
  title: string;
  disable?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function ConfigButton({
  title,
  disable = false,
  onClick,
}: Props) {
  const textColor = disable ? 'grayAlternatives.200' : 'primary';
  return (
    <Tooltip label={disable ? '敬请期待' : ''}>
      <Flex
        justifyContent="center"
        alignItems="center"
        width="124px"
        height="40px"
        borderRadius="4px"
        backgroundColor={disable ? 'gray.50' : 'brand.50'}
        cursor={disable ? 'not-allowed' : 'pointer'}
        onClick={disable ? undefined : onClick}
      >
        <Text color={textColor} fontSize="12px">
          {title}
        </Text>
        <RightFilledIcon color={textColor} style={{ marginLeft: '8px' }} />
      </Flex>
    </Tooltip>
  );
}
