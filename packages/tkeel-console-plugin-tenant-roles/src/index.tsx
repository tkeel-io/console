import './public-path';

import { render, unmountComponentAtNode } from 'react-dom';

import { GlobalPluginProps } from '@tkeel/console-types';

import App from './App';

export async function bootstrap() {
  //
}

export async function mount(props: GlobalPluginProps) {
  const container = props?.container;
  const rootContainer = container
    ? container.querySelector('#root')
    : document.querySelector('#root');

  render(<App {...props} />, rootContainer);
}

export async function unmount(props: GlobalPluginProps) {
  const { container } = props;
  const rootContainer = (
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  ) as Element;

  unmountComponentAtNode(rootContainer);
}
