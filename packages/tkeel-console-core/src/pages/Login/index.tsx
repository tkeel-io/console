import React from 'react';
import { Box } from '@chakra-ui/react';
import { BellIcon, BellIconTwoTone } from '@tkeel/console-icons';

function Login(): JSX.Element {
  return (
    <Box>
      Login
      <BellIcon mode="dark" size="10rem" />
      <BellIcon mode="light" size={128} />
      <BellIcon color="#f38432" size={128} />
      <BellIconTwoTone mode="dark" size={128} />
      <BellIconTwoTone mode="light" size={128} />
      <BellIconTwoTone color="#f38432" twoToneColor="#000" size={128} />
    </Box>
  );
}

export default Login;
