import { values } from 'lodash';

import { useQuery } from '@tkeel/console-hooks';
import { CommandItem } from '@tkeel/console-types';
import { RequestResult } from '@tkeel/console-utils';

const method = 'GET';

type RequestParams = {
  page_num?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  key_words?: string;
  id?: string;
};

export interface Command {
  [propName: string]: CommandItem;
}
export interface ApiData {
  '@type': string;
  templateCmdObject: {
    configs?: {
      commands?: {
        define?: {
          fields?: Command;
        };
      };
    };
  };
}

export default function useListTemplateCommandQuery({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: (
    data: RequestResult<ApiData, undefined, RequestParams>
  ) => unknown;
}) {
  const url = `/tkeel-device/v1/templates/${id}/command`;

  const { data, ...rest } = useQuery<ApiData, undefined, RequestParams>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
  const commandList =
    values(data?.templateCmdObject?.configs?.commands?.define?.fields) || [];
  return { commandList, data, ...rest };
}
