import { Box, Heading } from '@chakra-ui/react';

import TreeSelectExample from './components/TreeSelectExample';

export default function Index() {
  return (
    <Box bg="white" w="100%" h="100%">
      <Heading>Example</Heading>
      <TreeSelectExample />
    </Box>
  );
}
