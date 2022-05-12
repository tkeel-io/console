import { useMutation } from '@tkeel/console-hooks';

export interface ApiData {
  '@type': string;
}

interface Props {
  key: string;
  path: string;
}

export default function useDeletePortalConfigMutation({ key, path }: Props) {
  const url = `/rudder/v1/config/platform/update/?key=${key}&path=${path}`;
  return useMutation<ApiData>({
    url,
    method: 'DELETE',
  });
}
