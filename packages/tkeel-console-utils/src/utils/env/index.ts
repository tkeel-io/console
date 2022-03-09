export function isEnvDevelopment() {
  return process.env.NODE_ENV === 'development';
}

export function getConsoleType() {
  if (typeof GLOBAL_PORTAL_CONFIG === 'object' && GLOBAL_PORTAL_CONFIG) {
    return 'portal';
  }

  if (typeof GLOBAL_PLUGIN_CONFIG === 'object' && GLOBAL_PLUGIN_CONFIG) {
    return 'plugin';
  }

  return '';
}

export function isPortal() {
  const consoleType = getConsoleType();
  return consoleType === 'portal';
}
