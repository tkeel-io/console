import { Flex, Text } from '@chakra-ui/react';
import { ChevronLeftFilledIcon } from '@tkeel/console-icons';

type Props = {
  onClick: () => unknown;
};

function BackButton({ onClick }: Props) {
  return (
    <Flex
      width="57px"
      paddingLeft="7px"
      paddingRight="10px"
      alignItems="center"
      height="32px"
      cursor="pointer"
      _hover={{
        backgroundColor: 'gray.100',
        borderRadius: '32px',
        '& > p': {
          color: 'gray.700',
        },
      }}
      onClick={onClick}
    >
      <ChevronLeftFilledIcon color="gray.700" />
      <Text color="grayAlternatives.800" fontSize="12px">
        返回
      </Text>
    </Flex>
  );
}

export default BackButton;
