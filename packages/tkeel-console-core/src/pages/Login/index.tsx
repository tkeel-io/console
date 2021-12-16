import React from 'react';
import { Box } from '@chakra-ui/react';
import { BellIconFilled, BellIconTwoTone } from '@tkeel/console-icons';

function Login(): JSX.Element {
  return (
    <Box>
      Login
      <BellIconFilled mode="dark" size="10rem" />
      <BellIconFilled mode="light" size={128} />
      <BellIconFilled color="#f38432" size={128} />
      <BellIconTwoTone mode="dark" size={128} />
      <BellIconTwoTone mode="light" size={128} />
      <BellIconTwoTone color="#f38432" twoToneColor="#000" size={128} />
    </Box>
  );
}

export default Login;
