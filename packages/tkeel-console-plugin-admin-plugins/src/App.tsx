import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { PluginGlobalProps } from '@tkeel/console-types';

import Routes from './routes';

function App({ theme }: PluginGlobalProps) {
  return (
    <ChakraProvider theme={theme}>
      <Router
        basename={window.__POWERED_BY_QIANKUN__ ? process.env.BASE_PATH : '/'}
      >
        <Routes />
      </Router>
    </ChakraProvider>
  );
}

export default App;
