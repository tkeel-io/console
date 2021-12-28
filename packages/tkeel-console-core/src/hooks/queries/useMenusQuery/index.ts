import { useQuery } from '@tkeel/console-hooks';

const url = '/rudder/v1/entries';
const method = 'GET';

export default function useMenusQuery() {
  return useQuery({ url, method });
}
