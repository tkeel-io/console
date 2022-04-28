const PORTS = new Set(['80', '443']);

function isShowPort(port: string | number = '') {
  const value = String(port ?? '').trim();

  if (value) {
    return !PORTS.has(value);
  }

  return false;
}

export function getURL(hostname: string, port?: string) {
  const hostnameString = String(hostname ?? '').trim();
  const portString = String(port ?? '').trim();
  return isShowPort(portString)
    ? `${hostnameString}:${portString}`
    : hostnameString;
}

export function addProtocol(url: string) {
  if (!url) return '';
  const containProtocol = /^(http|https):\/\//.test(url);
  const { protocol } = window.location;
  return containProtocol ? url : `${protocol}//${url}`;
}
