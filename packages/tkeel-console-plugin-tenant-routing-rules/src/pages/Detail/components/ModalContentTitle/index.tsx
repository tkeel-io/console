import { Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  title: string;
};

export default function ModalContentTitle({ icon, title }: Props) {
  return (
    <Flex
      alignItems="center"
      padding="0 20px"
      height="44px"
      borderRadius="4px"
      backgroundColor="gray.100"
    >
      {icon}
      <Text marginLeft="10px" color="gray.700" fontSize="18px" fontWeight="600">
        {title}
      </Text>
    </Flex>
  );
}
