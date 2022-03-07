import './public-path';

import * as ReactDOM from 'react-dom';

import { GlobalPluginProps } from '@tkeel/console-types';

import App from './App';

function render(props: GlobalPluginProps) {
  const container = props?.container;

  ReactDOM.render(
    <App {...props} />,
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  );
}

export async function bootstrap() {
  //
}

export async function mount(props: GlobalPluginProps) {
  render(props);
}

export async function unmount(props: GlobalPluginProps) {
  const { container } = props;
  const rootContainer = (
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  ) as Element;

  ReactDOM.unmountComponentAtNode(rootContainer);
}
