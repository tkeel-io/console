import React from 'react';
import { Center, Flex, Text } from '@chakra-ui/react';

type Props = {
  icon: React.ReactNode;
  name: string;
  desc: string;
};

function PageHeader({ icon, name, desc }: Props) {
  return (
    <Flex
      padding="20px 24px"
      width="100%"
      height="100px"
      borderRadius="4px"
      backgroundColor="white"
      boxShadow="0px 10px 15px -3px rgba(113, 128, 150, 0.1),
    0px 4px 6px -2px rgba(113, 128, 150, 0.05)"
    >
      <Center width="60px" height="60px" backgroundColor="gray.100">
        {icon}
      </Center>
      <Flex
        marginLeft="20px"
        flexDirection="column"
        justifyContent="center"
        color="gray.700"
      >
        <Text fontSize="14px" fontWeight="600" lineHeight="22PX">
          {name}
        </Text>
        <Text marginTop="5px" fontSize="12px" lineHeight="17px">
          {desc}
        </Text>
      </Flex>
    </Flex>
  );
}

export default PageHeader;
