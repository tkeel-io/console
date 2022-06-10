import { ChakraProvider, Flex, StyleProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { QueryClient } from '@tkeel/console-hooks';
import { plugin } from '@tkeel/console-utils';

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
  style?: StyleProps;
};

export default function App({ children, style }: Props) {
  const portalProps = plugin.getPortalProps();
  const { theme } = portalProps.client;

  const newTheme = {
    ...theme,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    config: {
      ...(theme.config as object),
      disableTransitionOnChange: false,
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={newTheme}>
        <Router basename={plugin.getRouterBasename()}>
          <Flex
            flexDirection="column"
            height="100%"
            padding="0 20px 20px"
            {...style}
          >
            {children}
          </Flex>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
