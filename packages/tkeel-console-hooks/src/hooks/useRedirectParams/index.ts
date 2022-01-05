import { useSearchParams } from 'react-router-dom';

export default function useRedirectParams() {
  const [searchParams] = useSearchParams();
  return searchParams.get('redirect') || '/';
}
