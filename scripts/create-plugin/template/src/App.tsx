import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { QueryClient } from '@tkeel/console-hooks';
import { GlobalPluginProps } from '@tkeel/console-types';
import { plugin } from '@tkeel/console-utils';

import Routes from './routes';

const queryClient = new QueryClient();

export default function App(props: GlobalPluginProps) {
  const { theme } = props;

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Router basename={plugin.getRouterBasename()}>
          <Routes />
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
