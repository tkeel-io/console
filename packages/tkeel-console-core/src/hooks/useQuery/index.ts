import { useLocation, useNavigate } from 'react-router-dom';
import {
  UseCustomQueryOptions,
  useQuery as useCustomQuery,
} from '@tkeel/console-hooks';
import { merge } from 'lodash';

export default function useQuery<T, D = undefined>(
  options: UseCustomQueryOptions<T, D>
) {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const extras = {
    handleNoAuth() {
      const redirect = encodeURIComponent(`${pathname}${search}${hash}`);
      navigate(`/auth/login?redirect=${redirect}`, { replace: true });
    },
  };
  const opts = merge({}, { extras }, options);

  return useCustomQuery<T, D>(opts);
}
