/* eslint-disable no-underscore-dangle */

/* eslint-disable-next-line simple-import-sort/imports */
import './public-path';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { PluginProps } from '@tkeel/console-types';

interface Props extends PluginProps {
  container: HTMLElement;
}

function render(props: Props) {
  const container = props?.container;

  ReactDOM.render(
    <App {...props} />,
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  );
}

/* if (!window.__POWERED_BY_QIANKUN__) {
  render();
} */

export async function bootstrap() {
  //
}

export async function mount(props: Props) {
  render(props);
}

export async function unmount(props: Props) {
  const { container } = props;

  ReactDOM.unmountComponentAtNode(
    // @ts-ignore
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  );
}
