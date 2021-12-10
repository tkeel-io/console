/* eslint-disable no-underscore-dangle */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from '@tkeel/console-components';

import Routes from '@/containers/Routes';

import { IProps } from './types';

function App({ theme }: IProps) {
  return (
    <Provider theme={theme}>
      <Router
        // @ts-ignore
        basename={window.__POWERED_BY_QIANKUN__ ? process.env.BASE_PATH : '/'}
      >
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
