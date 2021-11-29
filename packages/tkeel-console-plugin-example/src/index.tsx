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

// eslint-disable-next-line no-underscore-dangle
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function bootstrap() {
  console.log('bootstrap');
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function mount(props: IProps) {
  console.log('mount', props);
  render(props);
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function unmount(props: IProps) {
  const { container } = props;

  ReactDOM.unmountComponentAtNode(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  );
}
