import React from 'react';
import { Box } from '@chakra-ui/react';
import { BellFilledIcon, BellTwoToneIcon } from '@tkeel/console-icons';

function Login(): JSX.Element {
  return (
    <Box>
      <Box backgroundColor="white">
        <BellFilledIcon mode="light" size={128} />
      </Box>
      <Box backgroundColor="black">
        <BellFilledIcon mode="dark" size={128} />
      </Box>
      <Box backgroundColor="white">
        <BellTwoToneIcon mode="light" size={128} />
      </Box>
      <Box backgroundColor="black">
        <BellTwoToneIcon mode="dark" size={128} />
      </Box>
    </Box>
  );
}

export default Login;
