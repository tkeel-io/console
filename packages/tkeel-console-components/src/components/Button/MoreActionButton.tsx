import { ReactNode } from 'react';
import { Flex, Text } from '@chakra-ui/react';

type Props = {
  icon: ReactNode;
  title: string;
  onClick: () => unknown;
};

function MoreActionButton({ icon, title, onClick }: Props) {
  return (
    <Flex
      alignItems="center"
      paddingLeft="14px"
      width="100%"
      height="32px"
      cursor="pointer"
      color="gray.600"
      borderRadius="4px"
      _hover={{
        backgroundColor: 'primary',
        '& > svg': {
          fill: 'white !important',
        },
        '& > p': {
          color: 'white',
        },
        '& > svg > path': {
          color: 'white',
        },
      }}
      onClick={onClick}
    >
      {icon}
      <Text marginLeft="6px" fontSize="12px">
        {title}
      </Text>
    </Flex>
  );
}

export default MoreActionButton;
