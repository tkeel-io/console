import { createRoot, Root } from 'react-dom/client';

import { GlobalPluginProps } from '@tkeel/console-types';
import { plugin } from '@tkeel/console-utils';

export function bootstrap() {
  //
}

let root: Root | null = null;

export function mount(props: GlobalPluginProps, App: () => JSX.Element) {
  const { container } = props;
  const rootContainer = container
    ? container.querySelector('#root')
    : document.querySelector('#root');

  plugin.initGlobalPluginProps(props);
  root = createRoot(rootContainer!);
  root.render(<App />);
}

export function unmount() {
  if (root) {
    root.unmount();
  }
}
