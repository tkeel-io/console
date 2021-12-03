/* eslint-disable no-underscore-dangle */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from '@tkeel/console-components';

import Routes from '@/containers/Routes';

function App() {
  return (
    <Provider>
      <Router
        // @ts-ignore
        basename={window.__POWERED_BY_QIANKUN__ ? process.env.BASENAME : '/'}
      >
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
