import { Location } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export
export function getNoAuthRedirectPath({
  basePath = '',
  location,
}: {
  location: Location;
  basePath?: string;
}) {
  // TODO: temp
  const loginPath = '/auth/login/2';
  const { pathname, search, hash } = location;
  const url = `${basePath}${pathname}${search}${hash}`.trim();

  if (['', '/'].includes(url)) {
    return loginPath;
  }

  const redirect = encodeURIComponent(url);

  return `${loginPath}?redirect=${redirect}`;
}
