import { GlobalPluginProps } from '@tkeel/console-types';

let GLOBAL_PLUGIN_PROPS: GlobalPluginProps;

export function initGlobalPluginProps(value: GlobalPluginProps) {
  GLOBAL_PLUGIN_PROPS = value;
  Object.freeze(GLOBAL_PLUGIN_PROPS);
}

export function getGlobalPluginProps() {
  return GLOBAL_PLUGIN_PROPS;
}
