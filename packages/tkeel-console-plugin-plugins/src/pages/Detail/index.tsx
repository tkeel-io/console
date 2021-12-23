import React from 'react';
// import { useParams } from 'react-router-dom';
import { Box, Button, Flex } from '@chakra-ui/react';

import InstallButton from '@/components/InstallButton';

function Detail() {
  // const params = useParams();
  // eslint-disable-next-line no-console
  // console.log('Detail ~ params.id', params.id);

  return (
    <Flex padding="20px" justifyContent="space-between">
      <Box width="360px">
        <Box height="124px" padding="16px" backgroundColor="gray.50">
          <Flex height="28px" justifyContent="space-between">
            <Button variant="outline" size="sm">
              返回
            </Button>
            <InstallButton size="sm" />
          </Flex>
          <Flex marginTop="16px">device</Flex>
        </Box>
        basic Info
      </Box>
      <Box marginLeft="20px" flex="1">
        detail22
      </Box>
    </Flex>
  );
}

export default Detail;
