import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { PluginProvider } from '@tkeel/console-business-components';
import { QueryClient } from '@tkeel/console-hooks';
import { GlobalPluginProps } from '@tkeel/console-types';

import Routes from './routes';

const queryClient = new QueryClient();

export default function App(props: GlobalPluginProps) {
  const { theme } = props;

  return (
    <PluginProvider globalProps={props}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Router
            basename={
              window.__POWERED_BY_QIANKUN__
                ? GLOBAL_PLUGIN_CONFIG.basePath
                : GLOBAL_PLUGIN_CONFIG.publicPath
            }
          >
            <Routes />
          </Router>
        </ChakraProvider>
      </QueryClientProvider>
    </PluginProvider>
  );
}
