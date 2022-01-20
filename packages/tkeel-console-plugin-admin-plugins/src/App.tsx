import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { PluginGlobalProps } from '@tkeel/console-types';

import Routes from './routes';

function App({ theme }: PluginGlobalProps) {
  return (
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
  );
}

export default App;
