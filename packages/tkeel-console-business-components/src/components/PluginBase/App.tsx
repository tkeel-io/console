import { ChakraProvider, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { QueryClient } from '@tkeel/console-hooks';
import { plugin } from '@tkeel/console-utils';

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

export default function App({ children }: Props) {
  const portalProps = plugin.getPortalProps();
  const { theme } = portalProps.client;

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Router basename={plugin.getRouterBasename()}>
          <Flex flexDirection="column" height="100%" padding="0 20px 20px">
            {children}
          </Flex>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
