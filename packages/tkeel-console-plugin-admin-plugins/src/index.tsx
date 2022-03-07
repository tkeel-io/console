import './public-path';

import * as ReactDOM from 'react-dom';

import { GlobalPluginProps } from '@tkeel/console-types';

import App from './App';

interface Props extends GlobalPluginProps {
  container: HTMLElement;
}

function render(props: Props) {
  const container = props?.container;
  const rootContainer = container
    ? container.querySelector('#root')
    : document.querySelector('#root');

  ReactDOM.render(<App {...props} />, rootContainer);
}

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
