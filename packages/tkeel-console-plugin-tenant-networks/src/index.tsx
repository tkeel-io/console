import './public-path';

import { PluginBase } from '@tkeel/console-business-components';
import { GlobalPluginProps } from '@tkeel/console-types';

import App from './App';

const { lifeCycles } = PluginBase;

export async function bootstrap() {
  lifeCycles.bootstrap();
}

export async function mount(props: GlobalPluginProps) {
  lifeCycles.mount(props, App);
}

export async function unmount() {
  lifeCycles.unmount();
}
