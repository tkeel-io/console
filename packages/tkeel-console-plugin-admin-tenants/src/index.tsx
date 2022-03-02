import './public-path';

import * as ReactDOM from 'react-dom';

import { GlobalPluginProps } from '@tkeel/console-types';

import App from './App';

interface Props extends GlobalPluginProps {
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
  const rootContainer = (
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  ) as Element;

  ReactDOM.unmountComponentAtNode(rootContainer);
}
