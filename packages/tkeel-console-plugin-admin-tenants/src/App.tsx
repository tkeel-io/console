import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { PluginProvider } from '@tkeel/console-business-components';
import { QueryClient } from '@tkeel/console-hooks';
import { PluginGlobalProps } from '@tkeel/console-types';

import Routes from '@/tkeel-console-plugin-admin-tenants/routes';

const queryClient = new QueryClient();

function App(props: PluginGlobalProps) {
  const { theme } = props;

  return (
    <PluginProvider globalProps={props}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Router
            basename={
              window.__POWERED_BY_QIANKUN__
                ? GLOBAL_CONFIG.basePath
                : GLOBAL_CONFIG.publicPath
            }
          >
            <Routes />
          </Router>
        </ChakraProvider>
      </QueryClientProvider>
    </PluginProvider>
  );
}

export default App;
