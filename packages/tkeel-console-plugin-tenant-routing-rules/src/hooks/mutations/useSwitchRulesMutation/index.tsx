import { useMutation } from '@tkeel/console-hooks';
// import { RequestResult } from '@tkeel/console-utils';

interface RequestData {
  status: number;
}

export interface ApiData {
  '@type': string;
  status: number;
  id: string;
}

type Props = {
  id: string;
  onSuccess?: ({ data }: { data: ApiData }) => void;
  // onSuccess?: ({data.data} : ApiData) => void;
};

const url = '/rule-manager/v1/rules';
const method = 'PUT';

export default function useSwitchRulesMutation({ id, onSuccess }: Props) {
  return useMutation<ApiData, undefined, RequestData>({
    url: `${url}/${id}/running_status`,
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
