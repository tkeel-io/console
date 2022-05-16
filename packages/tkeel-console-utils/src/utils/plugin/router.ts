export function getRouterBasename() {
  return window.__POWERED_BY_QIANKUN__
    ? GLOBAL_PLUGIN_CONFIG.client.basePath
    : GLOBAL_PLUGIN_CONFIG.publicPath;
}
