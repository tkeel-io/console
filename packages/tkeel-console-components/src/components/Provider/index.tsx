import React from 'react';
import { ChakraProvider, ChakraProviderProps } from '@chakra-ui/react';

function Provider(props: ChakraProviderProps): JSX.Element {
  return <ChakraProvider {...props} />;
}

export default Provider;
