import { Box, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { BackButton } from '@tkeel/console-components';

export default function Detail() {
  const navigate = useNavigate();
  return (
    <Flex
      paddingTop="20px"
      height="100%"
      justifyContent="center"
      position="relative"
    >
      <Box
        position="absolute"
        left="0"
        top="0"
        width="100%"
        height="200px"
        backgroundColor="grayAlternatives.50"
      />
      <BackButton
        position="absolute"
        left="37px"
        top="20px"
        onClick={() => {
          navigate('/');
        }}
      />
      <Flex width="82%">ss</Flex>
    </Flex>
  );
}
