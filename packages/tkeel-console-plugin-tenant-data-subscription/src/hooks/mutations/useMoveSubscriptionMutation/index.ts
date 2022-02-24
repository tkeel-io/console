import { useLocation } from 'react-router-dom';

import useMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/useMutation';

export interface ApiData {
  '@type': string;
}

type Props = {
  onSuccess?: () => void;
};

const method = 'PUT';

interface RequestData {
  targetId: number;
  selectedIds: string[];
}

export default function useMoveSubscriptionMutation({ onSuccess }: Props) {
  const location = useLocation();
  const { pathname }: { pathname: string } = location;
  const ID = pathname.split('/')[pathname.split('/').length - 1];
  const url = `/core-broker/v1/subscribe/${ID}`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
