import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface ApiData {
  '@types': string;
  id: string;
  types: string[];
}

type Meta = {
  user: string;
  password: string;
  db_name: string;
};

type RequestData = {
  urls: string;
  meta: Meta;
};

const method = 'POST';
const url = '/rule-manager/v1/verify';

type Props = {
  interfaceType: string;
  onSuccess: (
    data: RequestResult<ApiData, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
};

export default function useVerifyAddressMutation({
  interfaceType,
  onSuccess,
}: Props) {
  return useMutation<ApiData, undefined, RequestData>({
    url: `${url}/${interfaceType}`,
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
