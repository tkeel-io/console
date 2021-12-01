/* eslint-disable no-underscore-dangle */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './public-path';

interface IProps {
  container?: HTMLElement;
}

function render(props: IProps) {
  const { container } = props;
  ReactDOM.render(
    <App />,
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  );
}

// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function bootstrap() {
  // eslint-disable-next-line no-console
  // console.log('bootstrap');
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function mount(props: IProps) {
  // eslint-disable-next-line no-console
  // console.log('mount', props);
  render(props);
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function unmount(props: IProps) {
  const { container } = props;

  ReactDOM.unmountComponentAtNode(
    // @ts-ignore
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  );
}
