import { Location } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export
export function getRedirect({
  basePath = '',
  location,
  isWithLogin = false,
}: {
  location: Location;
  basePath?: string;
  isWithLogin: boolean;
}) {
  const { pathname, search, hash } = location;
  const url = `${basePath}${pathname}${search}${hash}`;
  const redirect = encodeURIComponent(url);

  if (isWithLogin) {
    return `/auth/login?redirect=${redirect}`;
  }

  return redirect;
}
