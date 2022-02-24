import { useLocation } from 'react-router-dom';

import useMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/useMutation';

export interface ApiData {
  '@type': string;
  id: string;
}

type RequestData = {
  entities: string[];
};

const method = 'POST';

export default function useDeleteSubscriptionDeviceMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const location = useLocation();
  const { pathname }: { pathname: string } = location;
  const ID = pathname.split('/')[pathname.split('/').length - 1];

  const url = `/core-broker/v1/subscribe/${ID}/entities/delete`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
