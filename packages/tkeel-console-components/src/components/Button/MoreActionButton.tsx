import { Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { useColor } from '@tkeel/console-hooks';

type Props = {
  icon?: ReactNode;
  title: string;
  onClick: () => unknown;
};

export default function MoreActionButton({ icon, title, onClick }: Props) {
  const whiteColor = `${useColor('white')} !important`;

  return (
    <Flex
      alignItems="center"
      paddingLeft="8px"
      paddingRight="4px"
      height="32px"
      cursor="pointer"
      color="gray.600"
      borderRadius="4px"
      _hover={{
        backgroundColor: 'primary',
        '& > svg': {
          fill: whiteColor,
        },
        '& > p': {
          color: whiteColor,
        },
      }}
      onClick={onClick}
    >
      {icon}
      <Text marginLeft={icon ? '6px' : '0'} fontSize="12px">
        {title}
      </Text>
    </Flex>
  );
}
