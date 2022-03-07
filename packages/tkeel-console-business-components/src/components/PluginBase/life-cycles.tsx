import { render, unmountComponentAtNode } from 'react-dom';

import { GlobalPluginProps } from '@tkeel/console-types';

export function bootstrap() {
  //
}

export function mount(props: GlobalPluginProps, App: () => JSX.Element) {
  const { container } = props;
  const rootContainer = container
    ? container.querySelector('#root')
    : document.querySelector('#root');

  render(<App />, rootContainer);
}

export function unmount(props: GlobalPluginProps) {
  const { container } = props;
  const rootContainer = (
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  ) as Element;

  unmountComponentAtNode(rootContainer);
}
