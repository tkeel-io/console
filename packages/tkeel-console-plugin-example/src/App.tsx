/* eslint-disable no-underscore-dangle */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';
import { Button as CustomButton } from '@tkeel/console-components';

import Routes from '@/containers/Routes';

function App() {
  return (
    <>
      <Box display="flex" justifyContent="center" bg="blue.500">
        <a href="/">a标签</a>
        <Button colorScheme="teal">Default Button</Button>
        <CustomButton size="xl" variant="with-shadow">
          Custom Button
        </CustomButton>
      </Box>
      <Router
        // @ts-ignore
        basename={window.__POWERED_BY_QIANKUN__ ? '/plugin-example' : '/'}
      >
        <Routes />
      </Router>
    </>
  );
}

export default App;
