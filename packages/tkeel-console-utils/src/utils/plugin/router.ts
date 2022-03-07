// eslint-disable-next-line import/prefer-default-export
export function getRouterBasename() {
  return window.__POWERED_BY_QIANKUN__
    ? PLUGIN_GLOBALS.basePath
    : PLUGIN_GLOBALS.publicPath;
}
