import { Location } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export
export function getNoAuthRedirectPath({
  basePath = '',
  location,
}: {
  location: Location;
  basePath?: string;
}) {
  const { pathname, search, hash } = location;
  const url = `${basePath}${pathname}${search}${hash}`;
  const redirect = encodeURIComponent(url);

  return `/auth/login?redirect=${redirect}`;
}
