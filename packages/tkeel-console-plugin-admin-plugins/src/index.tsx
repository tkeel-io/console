import './public-path';

import * as ReactDOM from 'react-dom';

import { PluginGlobalProps } from '@tkeel/console-types';

import App from './App';

function render(props: PluginGlobalProps) {
  const { container } = props;

  ReactDOM.render(
    <App {...props} />,
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  );
}

// if (!window.__POWERED_BY_QIANKUN__) {
//   render();
// }

export async function bootstrap() {
  //
}

export async function mount(props: PluginGlobalProps) {
  render(props);
}

export async function unmount(props: PluginGlobalProps) {
  const { container } = props;
  const rootContainer = (
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  ) as Element;

  ReactDOM.unmountComponentAtNode(rootContainer);
}
