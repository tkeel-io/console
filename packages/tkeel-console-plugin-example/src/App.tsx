/* eslint-disable no-underscore-dangle */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from '@/containers/Routes';

function App() {
  return (
    <Router
      // @ts-ignore
      basename={window.__POWERED_BY_QIANKUN__ ? '/plugin-example' : '/'}
    >
      <Routes />
    </Router>
  );
}

export default App;
